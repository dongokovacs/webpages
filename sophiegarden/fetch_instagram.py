import instaloader
import json
import sys

USERNAME = 'sophiesgarden_maglod'
OUTPUT   = 'sophiegarden/fb-posts.json'

try:
    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        quiet=True,
    )
    profile = instaloader.Profile.from_username(L.context, USERNAME)
    posts = []

    for post in profile.get_posts():
        if len(posts) >= 4:
            break
        if post.typename not in ('GraphImage', 'GraphSidecar', 'GraphVideo'):
            continue
        posts.append({
            'id':           str(post.mediaid),
            'message':      post.caption or '',
            'full_picture': post.url,
            'created_time': post.date_utc.strftime('%Y-%m-%dT%H:%M:%S+0000'),
            'likes':        {'summary': {'total_count': post.likes}},
            'comments':     {'summary': {'total_count': post.comments}},
            'permalink_url': f'https://www.instagram.com/p/{post.shortcode}/',
        })

    if not posts:
        print('Nincsenek posztok – regi adatok maradnak')
        sys.exit(0)

    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump({'_source': 'instagram', 'data': posts}, f, ensure_ascii=False, indent=2)

    print(f'OK: {len(posts)} poszt mentve')

except Exception as e:
    print(f'Hiba: {e}', file=sys.stderr)
    sys.exit(1)
