"""
Publikus Facebook oldal legfrissebb posztjainak lekérése
Playwright headless Chromiummal – API kulcs nélkül
"""
import json
import sys
import re
from datetime import datetime
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

PAGE_URL = 'https://www.facebook.com/SophiesGardenMaglod'
OUTPUT   = 'sophiegarden/fb-posts.json'
LIMIT    = 4


def scrape(page):
    posts = []

    # Facebook login popup elutasítása
    try:
        page.click('[aria-label="Bezárás"]', timeout=4000)
    except Exception:
        pass
    try:
        page.click('[data-testid="cookie-policy-dialog-accept-button"]', timeout=3000)
    except Exception:
        pass

    # Cookie accept (EU) – különböző szövegek lehetnek
    for btn_text in ['Összes elfogadása', 'Allow all cookies', 'Accept all']:
        try:
            page.click(f'text="{btn_text}"', timeout=2000)
            break
        except Exception:
            pass

    # Görgessünk le egy kicsit hogy betöltődjön a feed
    page.wait_for_timeout(2000)
    page.evaluate('window.scrollBy(0, 800)')
    page.wait_for_timeout(2000)

    # Posztok keresése – Facebook article elemek
    articles = page.query_selector_all('div[role="article"]')

    for article in articles:
        if len(posts) >= LIMIT:
            break
        try:
            # Szöveg
            msg_el = article.query_selector('div[data-ad-preview="message"]')
            if not msg_el:
                # Próbálkozás más selectorral
                spans = article.query_selector_all('span[dir="auto"]')
                text = ' '.join(s.inner_text() for s in spans[:3] if s.inner_text().strip())
            else:
                text = msg_el.inner_text()

            if not text or len(text) < 10:
                continue

            # Kép URL
            img_el = article.query_selector('img[referrerpolicy]')
            img_url = img_el.get_attribute('src') if img_el else ''

            # Link a poszthoz
            link_el = article.query_selector('a[href*="/posts/"], a[href*="/permalink/"]')
            permalink = link_el.get_attribute('href') if link_el else PAGE_URL
            if permalink and not permalink.startswith('http'):
                permalink = 'https://www.facebook.com' + permalink

            # Dátum – ha van timestamp
            time_el = article.query_selector('abbr[data-utime]')
            if time_el:
                ts = int(time_el.get_attribute('data-utime'))
                created = datetime.utcfromtimestamp(ts).strftime('%Y-%m-%dT%H:%M:%S+0000')
            else:
                created = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S+0000')

            posts.append({
                'id':           permalink.split('/')[-2] if permalink != PAGE_URL else str(len(posts)),
                'message':      text.strip(),
                'full_picture': img_url,
                'created_time': created,
                'likes':        {'summary': {'total_count': 0}},
                'comments':     {'summary': {'total_count': 0}},
                'permalink_url': permalink,
            })
        except Exception as e:
            print(f'  Poszt parse hiba: {e}', file=sys.stderr)
            continue

    return posts


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=['--no-sandbox', '--disable-dev-shm-usage', '--disable-blink-features=AutomationControlled'],
        )
        ctx = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            locale='hu-HU',
            viewport={'width': 1280, 'height': 800},
        )
        page = ctx.new_page()

        try:
            page.goto(PAGE_URL, wait_until='domcontentloaded', timeout=30000)
        except PWTimeout:
            print('Timeout az oldal betöltésekor', file=sys.stderr)
            sys.exit(1)

        posts = scrape(page)
        browser.close()

    if not posts:
        print('Nem sikerült posztokat beolvasni – régi adatok maradnak', file=sys.stderr)
        sys.exit(0)   # 0 = ne bukjon el a workflow, csak tartsa a régit

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'OK: {len(posts)} poszt mentve')
    for p in posts:
        print(f"  {p['created_time'][:10]}  {p['message'][:70]}")


if __name__ == '__main__':
    main()
