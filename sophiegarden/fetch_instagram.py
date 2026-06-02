"""
Publikus Facebook oldal legfrissebb posztjai
mbasic.facebook.com – szerver-oldali HTML, API nélkül
"""
import requests
from bs4 import BeautifulSoup
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


def to_permalink(href):
    """mbasic relatív href → teljes Facebook URL"""
    if not href:
        return f'https://www.facebook.com/{PAGE}'
    if href.startswith('http'):
        return href
    full = BASE + href
    # story.php?story_fbid=123&id=456 → /permalink.php
    m = re.search(r'story_fbid=(\d+)&id=(\d+)', href)
    if m:
        return f'https://www.facebook.com/permalink.php?story_fbid={m.group(1)}&id={m.group(2)}'
    # /PageName/posts/pfbid... vagy /posts/12345
    if '/posts/' in href:
        path = re.sub(r'\?.*', '', href)   # query params levágása
        return 'https://www.facebook.com' + path
    return full


def unique_key(href):
    """Egyedi kulcs a poszt azonosítására"""
    # pfbid, story_fbid, vagy a posts/ utáni rész
    for pat in [r'pfbid([A-Za-z0-9]+)', r'story_fbid=(\d+)', r'/posts/([A-Za-z0-9]+)']:
        m = re.search(pat, href)
        if m:
            return m.group(1)
    return re.sub(r'[^A-Za-z0-9]', '', href)[-24:]


def scrape():
    r = requests.get(f'{BASE}/{PAGE}', headers=HEADERS, timeout=20)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, 'html.parser')

    # Összes link ami poszt-ra mutat
    story_links = soup.find_all('a', href=re.compile(
        r'(story_fbid|/posts/|/permalink\.php)'
    ))
    print(f'Talált story linkek: {len(story_links)}')

    posts = []
    seen  = set()

    for link in story_links:
        if len(posts) >= LIMIT:
            break

        href = link.get('href', '')
        key  = unique_key(href)

        if not key or key in seen:
            continue
        seen.add(key)

        # Poszt szülő blokkja – menjünk fel amíg elég szöveget találunk
        block = link.find_parent('div')
        for _ in range(8):
            if not block:
                break
            txt = block.get_text(' ', strip=True)
            if len(txt) > 80:
                break
            block = block.find_parent('div')

        if not block:
            continue

        # --- Szöveg ---
        # 1. Próbálj dir="auto" span-okat
        parts = [el.get_text(' ', strip=True)
                 for el in block.find_all(['span', 'p'], attrs={'dir': 'auto'})
                 if len(el.get_text(strip=True)) > 8]
        text = ' '.join(dict.fromkeys(parts))  # dedupe, sorrend megtart
        if len(text) < 20:
            text = block.get_text(' ', strip=True)[:400]
        if len(text) < 20:
            continue

        # --- Kép ---
        img_url = ''
        for img in block.find_all('img'):
            src = img.get('src', '')
            if 'scontent' not in src:
                continue
            w = int(img.get('width') or 0)
            if w and w < 80:   # profilkép méret → kihagyás
                continue
            if any(x in src for x in ['s32x32', 's50x50', 's60x60', 'profile']):
                continue
            img_url = src
            break

        # --- Dátum ---
        abbr = block.find('abbr')
        if abbr and abbr.get('title'):
            created = abbr['title']
        else:
            created = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S+0000')

        permalink = to_permalink(href)

        posts.append({
            'id':           key,
            'message':      text[:500].strip(),
            'full_picture': img_url,
            'created_time': created,
            'likes':        {'summary': {'total_count': 0}},
            'comments':     {'summary': {'total_count': 0}},
            'permalink_url': permalink,
        })
        print(f'  [{len(posts)}] {key[:16]}  {text[:60]}')

    return posts


def main():
    try:
        posts = scrape()
    except Exception as e:
        print(f'Hiba: {e}', file=sys.stderr)
        sys.exit(0)

    if not posts:
        print('Nem sikerült posztot kinyerni – régi adatok maradnak', file=sys.stderr)
        sys.exit(0)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook_mbasic', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'\n✓ {len(posts)} poszt → {OUTPUT}')


if __name__ == '__main__':
    main()
