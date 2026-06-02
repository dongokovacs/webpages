"""
Publikus Facebook oldal legfrissebb posztjai
mbasic.facebook.com – timestamp-alapú poszt-kinyerés
"""
import requests
from bs4 import BeautifulSoup, NavigableString
import json, sys, re
from datetime import datetime, timezone

PAGE   = 'SophiesGardenMaglod'
BASE   = 'https://mbasic.facebook.com'
OUTPUT = 'sophiegarden/fb-posts.json'
LIMIT  = 4

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
    r = requests.get(url, headers=HEADERS, timeout=25)
    r.raise_for_status()
    return BeautifulSoup(r.text, 'html.parser')


def find_post_block(element, min_len=60, max_up=12):
    """Menjünk felfelé a DOM-ban amíg elég szöveges blokkot találunk."""
    block = element.find_parent('div')
    for _ in range(max_up):
        if not block:
            break
        text = block.get_text(' ', strip=True)
        if len(text) >= min_len:
            return block
        block = block.find_parent('div')
    return None


def extract_text(block):
    """Szöveg kinyerése – dir=auto span/p elemekből, deduplikálva."""
    parts = []
    seen_t = set()
    for el in block.find_all(['p', 'span'], attrs={'dir': 'auto'}):
        t = el.get_text(' ', strip=True)
        if len(t) > 10 and t not in seen_t:
            parts.append(t)
            seen_t.add(t)
    text = ' '.join(parts)
    if len(text) < 20:
        # fallback: teljes blokk, de levágunk UI-szöveget
        text = block.get_text(' ', strip=True)[:400]
    return text.strip()


def extract_image(block):
    for img in block.find_all('img'):
        src = img.get('src', '')
        if 'scontent' not in src and 'fbcdn' not in src:
            continue
        w = int(img.get('width') or 0)
        if w and w < 100:
            continue
        if any(x in src for x in ['s32x32', 's50x50', 's60x60', '/safe_image']):
            continue
        return src
    return ''


def extract_permalink(block):
    # Keressük a "Továbbiak" / "See More" / "Megosztás" / timestamp linket
    for a in block.find_all('a', href=True):
        href = a['href']
        if any(p in href for p in ['/posts/', 'story_fbid', '/permalink', '/photos/']):
            path = re.sub(r'\?.*', '', href)   # query params le
            if path.startswith('/'):
                return 'https://www.facebook.com' + path
            if path.startswith('http'):
                return path
    return f'https://www.facebook.com/{PAGE}'


def scrape():
    soup = get_soup(f'{BASE}/{PAGE}')

    # Keresés: abbr időbélyeg elemek (minden poszt tartalmaz egyet)
    abbrs = soup.find_all('abbr')
    print(f'Talált <abbr> elemek: {len(abbrs)}')

    posts = []
    seen_texts = set()

    for abbr in abbrs:
        if len(posts) >= LIMIT:
            break

        # Poszt blokkja
        block = find_post_block(abbr, min_len=80)
        if not block:
            continue

        text = extract_text(block)

        # Duplikátum- és minőségszűrő
        key = text[:60]
        if len(text) < 20 or key in seen_texts:
            continue
        # Kihagyjuk a nem-poszt UI szöveget
        if any(skip in text for skip in ['Bejelentkezés', 'Regisztráció', 'Hírfolyam', 'Adatvédelem']):
            continue
        seen_texts.add(key)

        img_url   = extract_image(block)
        permalink = extract_permalink(block)
        created   = abbr.get('title') or datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+0000')

        posts.append({
            'id':           re.sub(r'[^A-Za-z0-9]', '', key)[:24],
            'message':      text[:500],
            'full_picture': img_url,
            'created_time': created,
            'likes':        {'summary': {'total_count': 0}},
            'comments':     {'summary': {'total_count': 0}},
            'permalink_url': permalink,
        })
        print(f'  [{len(posts)}] {created[:10]}  {text[:70]}')

    return posts


def main():
    try:
        posts = scrape()
    except Exception as e:
        print(f'Hiba: {e}', file=sys.stderr)
        import traceback; traceback.print_exc(file=sys.stderr)
        sys.exit(0)

    if not posts:
        print('Nem sikerült posztot kinyerni – régi adatok maradnak', file=sys.stderr)
        sys.exit(0)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook_mbasic', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'\n✓ {len(posts)} poszt mentve → {OUTPUT}')


if __name__ == '__main__':
    main()
