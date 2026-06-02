"""
Publikus Facebook oldal legfrissebb posztjai
mbasic.facebook.com – szerver-oldali HTML, JS nélkül, login nélkül
"""
import requests
from bs4 import BeautifulSoup
import json, sys, re
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs, urljoin

PAGE    = 'SophiesGardenMaglod'
BASE    = 'https://mbasic.facebook.com'
OUTPUT  = 'sophiegarden/fb-posts.json'
LIMIT   = 4

HEADERS = {
    'User-Agent': (
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) '
        'Chrome/124.0.0.0 Safari/537.36'
    ),
    'Accept-Language': 'hu-HU,hu;q=0.9,en;q=0.8',
    'Accept': 'text/html,application/xhtml+xml',
}


def clean_fb_url(href):
    """mbasic redirect URL-ből valódi URL kinyerése."""
    if not href:
        return f'https://www.facebook.com/{PAGE}'
    if href.startswith('http') and 'facebook.com' in href:
        return href
    if href.startswith('/'):
        # /story.php?story_fbid=... → permalink
        full = BASE + href
        parsed = urlparse(full)
        qs = parse_qs(parsed.query)
        if 'story_fbid' in qs:
            fbid = qs['story_fbid'][0]
            pageid = qs.get('id', [''])[0]
            return f'https://www.facebook.com/permalink.php?story_fbid={fbid}&id={pageid}'
        return full
    return f'https://www.facebook.com/{PAGE}'


def parse_timestamp(abbr_el):
    """<abbr title="..."> → ISO dátum."""
    if not abbr_el:
        return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+0000')
    title = abbr_el.get('title', '')
    # próbálj különböző formátumokat
    for fmt in ('%Y. %B %d. %H:%M', '%B %d, %Y at %I:%M %p', '%d %B %Y %H:%M'):
        try:
            dt = datetime.strptime(title, fmt)
            return dt.strftime('%Y-%m-%dT%H:%M:%S+0000')
        except ValueError:
            pass
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+0000')


def scrape_posts():
    url = f'{BASE}/{PAGE}'
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        r.raise_for_status()
    except Exception as e:
        print(f'Hálózati hiba: {e}', file=sys.stderr)
        return []

    soup = BeautifulSoup(r.text, 'html.parser')

    # mbasic struktúra: #structured_composer_async_container > div > div > ...
    # Posztok általában article vagy egyedi div id-vel
    posts = []
    seen_texts = set()

    # Próbálkozzunk több selectorral
    candidates = (
        soup.select('div[id^="u_"] > div')       # mbasic poszt konténerek
        or soup.select('article')
        or soup.select('div._55wp')               # régebbi mbasic class
    )

    # Fallback: keressük az összes <p> elemet ami szöveg
    if not candidates:
        # Próbáljuk a teljes oldal szöveg blokkjait
        candidates = soup.find_all('div', {'data-ft': True})

    print(f'Talált jelöltek: {len(candidates)}')

    for block in candidates:
        if len(posts) >= LIMIT:
            break

        # Szöveg kinyerése
        text_el = block.find('p') or block.find('span') or block
        text = text_el.get_text(' ', strip=True) if text_el else ''

        # Szűrés: legalább 20 karakter, ne legyen duplikált
        if len(text) < 20 or text in seen_texts:
            continue
        seen_texts.add(text)

        # Link a poszthoz
        link_el = block.find('a', href=re.compile(r'(story|permalink|photo)'))
        permalink = clean_fb_url(link_el['href'] if link_el else None)

        # Kép
        img_el = block.find('img')
        img_url = img_el['src'] if img_el and img_el.get('src', '').startswith('http') else ''

        # Dátum
        abbr_el = block.find('abbr')
        created = parse_timestamp(abbr_el)

        posts.append({
            'id':           str(len(posts) + 1),
            'message':      text,
            'full_picture': img_url,
            'created_time': created,
            'likes':        {'summary': {'total_count': 0}},
            'comments':     {'summary': {'total_count': 0}},
            'permalink_url': permalink,
        })

    return posts


def main():
    posts = scrape_posts()

    # Debug: ha kevés adat jött, mentse el az oldal HTML-jét a loghoz
    if not posts:
        print('Nem sikerült posztot kinyerni.', file=sys.stderr)
        print('Próbáld manuálisan: https://mbasic.facebook.com/SophiesGardenMaglod', file=sys.stderr)
        sys.exit(0)   # exit 0 = workflow ne bukjon, régi adatok maradjanak

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook_mbasic', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'OK: {len(posts)} poszt mentve')
    for p in posts:
        print(f"  {p['created_time'][:10]}  {p['message'][:80]}")


if __name__ == '__main__':
    main()
