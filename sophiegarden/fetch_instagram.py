"""
Publikus Facebook oldal legfrissebb 4 posztjának lekérése
- Nincs szükség API kulcsra vagy tokenre
- Az oldal publikus: facebook.com/SophiesGardenMaglod
"""

from facebook_scraper import get_posts
import json
import sys
from datetime import timezone

PAGE     = 'SophiesGardenMaglod'
OUTPUT   = 'sophiegarden/fb-posts.json'
LIMIT    = 4

try:
    posts = []

    for post in get_posts(
        PAGE,
        pages=2,
        options={
            'posts_per_page': 10,
            'allow_extra_requests': False,
        }
    ):
        if len(posts) >= LIMIT:
            break

        # Kép URL – első elérhető
        img = (
            post.get('image')
            or (post.get('images') or [None])[0]
            or ''
        )

        # Dátum ISO formátumba
        t = post.get('time')
        created = t.strftime('%Y-%m-%dT%H:%M:%S+0000') if t else ''

        posts.append({
            'id':           post.get('post_id', ''),
            'message':      post.get('text') or post.get('post_text') or '',
            'full_picture': img,
            'created_time': created,
            'likes':        {'summary': {'total_count': post.get('likes', 0) or 0}},
            'comments':     {'summary': {'total_count': post.get('comments', 0) or 0}},
            'permalink_url': post.get('post_url') or f'https://www.facebook.com/{PAGE}',
        })

    if not posts:
        print('Nincsenek posztok – régi adatok maradnak')
        sys.exit(0)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'facebook', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'OK: {len(posts)} poszt mentve')
    for p in posts:
        print(f"  - {p['created_time'][:10]}  {p['message'][:60]}...")

except Exception as e:
    print(f'Hiba: {e}', file=sys.stderr)
    sys.exit(1)
