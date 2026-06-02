"""
Publikus Facebook oldal legfrissebb posztjai
mbasic.facebook.com – szerver-oldali HTML, JS nélkül
"""
import requests
from bs4 import BeautifulSoup
import json, sys, re
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs

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
    'Accept-Language': 'hu-HU,hu;q=0.9',
    'Accept': 'text/html,application/xhtml+xml',
}


def get_soup(url):
    r = requests.get(url, headers=HEADERS, timeout=20)
    r.raise_for_status()
    return BeautifulSoup(r.text, 'html.parser')


def extract_permalink(href):
    if not href:
        return f'https://www.facebook.com/{PAGE}'
    if href.startswith('/'):
        href = BASE + href
    # Tisztítjuk a mbasic redirect paramétereket – csak a story URL kell
    m = re.search(r'(https://www\.facebook\.com/[^\?&"]+)', href)
    if m:
        return m.group(1)
    return f'https://www.facebook.com/{PAGE}'


def extract_story_id(href):
    if not href:
        return ''
    m = re.search(r'story_fbid=(\d+)', href)
    if m:
        return m.group(1)
    m = re.search(r'/posts/(\d+)', href)
    if m:
        return m.group(1)
    m = re.search(r'/(\d+)$', href.rstrip('/'))
    if m:
        return m.group(1)
    return ''


def scrape_posts():
    soup = get_soup(f'{BASE}/{PAGE}')
    posts = []
    seen = set()

    # mbasic struktúra: posztok <div id="..."> blokkokban vannak
    # Keressük az összes div-et ami tartalmaz story linket
    story_links = soup.find_all('a', href=re.compile(r'(story_fbid|/posts/|/permalink)'))

    print(f'Talált story linkek: {len(story_links)}')

    for link in story_links:
        if len(posts) >= LIMIT:
            break

        href = link.get('href', '')
        story_id = extract_story_id(href)

        if not story_id or story_id in seen:
            continue
        seen.add(story_id)

        # A link közelében lévő szülő div = poszt blokk
        block = link.find_parent('div')
        # Felmegyünk amíg elég szöveget találunk
        for _ in range(5):
            if block and len(block.get_text(strip=True)) > 30:
                break
            if block:
                block = block.find_parent('div')

        if not block:
            continue

        # Szöveg – az összes <p> és <span dir="auto">
        text_parts = []
        for el in block.find_all(['p', 'span'], attrs={'dir': 'auto'}):
            t = el.get_text(' ', strip=True)
            if t and len(t) > 5:
                text_parts.append(t)
        text = ' '.join(dict.fromkeys(text_parts))  # duplikátum nélkül

        if not text or len(text) < 15:
            # fallback: teljes blokk szövege
            text = block.get_text(' ', strip=True)[:300]

        if len(text) < 15:
            continue

        # Kép
        img = block.find('img', src=re.compile(r'https://scontent'))
        img_url = img['src'] if img else ''

        # Dátum
        abbr = block.find('abbr')
        if abbr and abbr.get('title'):
            created = abbr['title']
            # Egyszerűsített: adjuk vissza amit van
        else:
            created = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+0000')

        permalink = f'https://www.facebook.com/{PAGE}/posts/{story_id}'

        posts.append({
            'id':           story_id,
            'message':      text[:500],
            'full_picture': img_url,
            'created_time': created,
            'likes':        {'summary': {'total_count': 0}},
            'comments':     {'summary': {'total_count': 0}},
            'permalink_url': permalink,
        })
        print(f'  + {story_id}: {text[:60]}')

    return posts


def main():
    try:
        posts = scrape_posts()
    except Exception as e:
        print(f'Hiba: {e}', file=sys.stderr)
        sys.exit(0)

    if not posts:
        print('Nem sikerült posztot kinyerni – régi adatok maradnak', file=sys.stderr)
        sys.exit(0)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook_mbasic', 'data': posts[:LIMIT]}, f, ensure_ascii=False, indent=2)

    print(f'\nMentve: {min(len(posts), LIMIT)} poszt → {OUTPUT}')


if __name__ == '__main__':
    main()
