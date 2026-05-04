import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { readFile as ghRead, writeFile as ghWrite } from './github';

// ── Config ────────────────────────────────────────────────────────────────────
const ROOT        = path.resolve(process.cwd(), process.env.VERCEL ? '.' : '..');
const JWT_SECRET  = process.env.JWT_SECRET || 'local-dev-secret-change-in-prod';
const USE_GITHUB  = !!process.env.GITHUB_TOKEN;

interface UserConfig { password: string; sites: string[] }

function loadUsers(): Record<string, UserConfig> {
  if (process.env.ADMIN_USERS) return JSON.parse(process.env.ADMIN_USERS);
  const f = path.join(__dirname, '../users.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf-8')) : {};
}

const SITES: Record<string, { label: string; ghPath: string; localPath: string }> = {
  galiba: {
    label: 'Galiba Társulat',
    ghPath: 'galiba/index.html',
    localPath: path.join(ROOT, 'galiba/index.html'),
  },
  'bube-viragbolt': {
    label: 'Bübe virágbolt',
    ghPath: 'bube-viragbolt/index.html',
    localPath: path.join(ROOT, 'bube-viragbolt/index.html'),
  },
};

// ── HTML read/write ───────────────────────────────────────────────────────────
async function readHtml(site: typeof SITES[string]): Promise<{ html: string; sha?: string }> {
  if (USE_GITHUB) {
    const { content, sha } = await ghRead(site.ghPath);
    return { html: content, sha };
  }
  return { html: fs.readFileSync(site.localPath, 'utf-8') };
}

async function writeHtml(site: typeof SITES[string], html: string, sha?: string): Promise<void> {
  if (USE_GITHUB) {
    await ghWrite(site.ghPath, html, sha!);
  } else {
    fs.writeFileSync(site.localPath, html, 'utf-8');
  }
}

// ── JWT ───────────────────────────────────────────────────────────────────────
interface TokenPayload { username: string; sites: string[] }

function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

function verifyToken(token: string): TokenPayload | null {
  try { return jwt.verify(token, JWT_SECRET) as TokenPayload; }
  catch { return null; }
}

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(cookieParser());

// Static preview (local dev only — on Vercel these are served natively)
if (!USE_GITHUB) {
  app.use('/galiba',          express.static(path.join(ROOT, 'galiba')));
  app.use('/bube-viragbolt',  express.static(path.join(ROOT, 'bube-viragbolt')));
}

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const payload = verifyToken(req.cookies?.token || '');
  if (!payload) { res.status(401).json({ error: 'Nincs bejelentkezve' }); return; }
  (req as any).user = payload;
  next();
}

function requireSiteAccess(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user as TokenPayload;
  if (!user.sites.includes(req.params.site)) {
    res.status(403).json({ error: 'Nincs hozzáférés' }); return;
  }
  next();
}

// ── API: login ────────────────────────────────────────────────────────────────
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };
  const users = loadUsers();
  const user  = users[username];
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó' }); return;
  }
  const token = signToken({ username, sites: user.sites });
  const isProd = !!process.env.VERCEL;
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: isProd,
    maxAge: 8 * 60 * 60 * 1000,
    path: '/',
  });
  res.json({ username, sites: user.sites });
});

// ── API: logout ───────────────────────────────────────────────────────────────
app.post('/api/logout', (_req: Request, res: Response) => {
  res.clearCookie('token', { path: '/' });
  res.json({ ok: true });
});

// ── API: me ───────────────────────────────────────────────────────────────────
app.get('/api/me', (req: Request, res: Response) => {
  const payload = verifyToken(req.cookies?.token || '');
  if (!payload) { res.status(401).json({ error: 'Nincs bejelentkezve' }); return; }
  res.json({ username: payload.username, sites: payload.sites });
});

// ── API: get fields ───────────────────────────────────────────────────────────
app.get('/api/fields/:site', requireAuth, requireSiteAccess, async (req: Request, res: Response) => {
  const site = SITES[req.params.site];
  if (!site) { res.status(404).json({ error: 'Site not found' }); return; }
  try {
    const { html } = await readHtml(site);
    const $ = cheerio.load(html, { decodeEntities: false });
    const fields: { key: string; label: string; value: string }[] = [];
    $('[data-editable]').each((_: number, el: cheerio.Element) => {
      fields.push({
        key:   $(el).attr('data-editable')!,
        label: $(el).attr('data-label') || $(el).attr('data-editable')!,
        value: $(el).html()?.trim() ?? '',
      });
    });
    res.json(fields);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── API: save fields ──────────────────────────────────────────────────────────
app.post('/api/save/:site', requireAuth, requireSiteAccess, async (req: Request, res: Response) => {
  const site = SITES[req.params.site];
  if (!site) { res.status(404).json({ error: 'Site not found' }); return; }
  try {
    const { html, sha } = await readHtml(site);
    const $ = cheerio.load(html, { decodeEntities: false });
    const updates: Record<string, string> = req.body;
    Object.entries(updates).forEach(([key, value]) => {
      $(`[data-editable="${key}"]`).html(value);
    });
    await writeHtml(site, $.html(), sha);
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ── Admin UI ──────────────────────────────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.send(/* html */`<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Weboldal szerkesztő</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #f5f5f5; color: #1a1a1a; }

    #login-screen {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
    }
    .login-card {
      background: #fff; border-radius: 16px; padding: 2.5rem 2rem;
      width: 100%; max-width: 360px; box-shadow: 0 4px 24px rgba(0,0,0,0.10);
    }
    .login-card h1 { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.4rem; }
    .login-card p  { font-size: 0.9rem; color: #888; margin-bottom: 1.8rem; }
    .login-field { margin-bottom: 1rem; }
    .login-field label { display: block; font-size: 0.82rem; font-weight: 700; color: #555; margin-bottom: 0.3rem; }
    .login-field input {
      width: 100%; padding: 0.65rem 0.9rem; border: 2px solid #ddd; border-radius: 8px;
      font-size: 1rem; font-family: inherit; transition: border-color 0.15s;
    }
    .login-field input:focus { outline: none; border-color: #f4720a; }
    #login-btn {
      width: 100%; margin-top: 0.5rem; background: #f4720a; color: #fff;
      border: none; border-radius: 10px; padding: 0.75rem; font-size: 1rem;
      font-weight: 700; cursor: pointer; transition: background 0.15s;
    }
    #login-btn:hover { background: #c85500; }
    #login-error { color: #dc2626; font-size: 0.85rem; font-weight: 600; margin-top: 0.8rem; display: none; }

    #app-screen { display: none; }
    header {
      background: #1a1a1a; color: #fff; padding: 1rem 2rem;
      display: flex; align-items: center; gap: 1rem;
    }
    header h1 { font-size: 1.2rem; font-weight: 700; }
    #preview-btn {
      margin-left: auto; margin-right: 0.5rem; padding: 0.5rem 1.2rem;
      border-radius: 8px; background: #fff; color: #1a1a1a;
      font-size: 0.9rem; font-weight: 700; text-decoration: none;
      white-space: nowrap; display: none;
    }
    #logout-btn {
      padding: 0.5rem 1rem; border-radius: 8px; background: transparent;
      color: #aaa; border: 1px solid #444; font-size: 0.85rem; cursor: pointer;
    }
    #logout-btn:hover { color: #fff; border-color: #888; }
    header select { padding: 0.5rem 1rem; border-radius: 8px; border: none; font-size: 1rem; cursor: pointer; }

    main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .section-heading {
      font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
      text-transform: uppercase; color: #888; margin: 2rem 0 0.75rem;
      padding-bottom: 0.4rem; border-bottom: 2px solid #e0e0e0;
    }
    .field { margin-bottom: 1rem; }
    .field label { display: block; font-size: 0.85rem; font-weight: 700; color: #444; margin-bottom: 0.3rem; }
    .field textarea {
      width: 100%; padding: 0.6rem 0.8rem; border: 2px solid #ddd; border-radius: 8px;
      font-size: 0.95rem; font-family: inherit; resize: vertical; min-height: 52px;
      transition: border-color 0.15s;
    }
    .field textarea:focus { outline: none; border-color: #f4720a; }
    .field textarea.changed { border-color: #f4720a; background: #fff8f4; }
    .html-note { font-size: 0.75rem; color: #aaa; margin-top: 0.2rem; }

    .save-bar {
      position: sticky; bottom: 0; background: #fff; border-top: 2px solid #eee;
      padding: 1rem; display: flex; gap: 1rem; align-items: center; margin-top: 2rem;
    }
    #save-btn {
      background: #f4720a; color: #fff; border: none; border-radius: 10px;
      padding: 0.75rem 2rem; font-size: 1rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
    }
    #save-btn:hover { background: #c85500; }
    #save-btn:disabled { background: #ccc; cursor: default; }
    #status { font-size: 0.9rem; font-weight: 600; color: #888; }
    #status.ok  { color: #16a34a; }
    #status.err { color: #dc2626; }
    .empty { text-align: center; color: #aaa; padding: 4rem; }
    .deploy-note { font-size: 0.8rem; color: #888; }
  </style>
</head>
<body>

<div id="login-screen">
  <div class="login-card">
    <h1>✏️ Weboldal szerkesztő</h1>
    <p>Jelentkezz be a szerkesztéshez</p>
    <div class="login-field">
      <label for="u">Felhasználónév</label>
      <input id="u" type="text" autocomplete="username" />
    </div>
    <div class="login-field">
      <label for="p">Jelszó</label>
      <input id="p" type="password" autocomplete="current-password" />
    </div>
    <button id="login-btn">Belépés</button>
    <div id="login-error">Hibás felhasználónév vagy jelszó</div>
  </div>
</div>

<div id="app-screen">
  <header>
    <h1>✏️ Weboldal szerkesztő</h1>
    <a id="preview-btn" href="#" target="_blank">🌐 Honlap megtekintése</a>
    <select id="site-select"><option value="">— Válassz oldalt —</option></select>
    <button id="logout-btn">Kilépés</button>
  </header>
  <main>
    <div id="fields"><p class="empty">Válassz egy oldalt fent!</p></div>
    <div class="save-bar">
      <button id="save-btn" disabled>Mentés</button>
      <span id="status"></span>
    </div>
  </main>
</div>

<script>
  const SITE_LABELS = { galiba: 'Galiba Társulat', 'bube-viragbolt': 'Bübe virágbolt' };

  const $ = id => document.getElementById(id);
  const loginScreen = $('login-screen'), appScreen = $('app-screen');
  const loginBtn = $('login-btn'), loginError = $('login-error');
  const logoutBtn = $('logout-btn'), select = $('site-select');
  const container = $('fields'), saveBtn = $('save-btn');
  const statusEl = $('status'), previewBtn = $('preview-btn');

  let currentSite = '', original = {};

  (async () => {
    const res = await fetch('/api/me');
    if (res.ok) showApp(await res.json());
  })();

  async function doLogin() {
    loginError.style.display = 'none';
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: $('u').value.trim(), password: $('p').value }),
    });
    if (res.ok) showApp(await res.json());
    else loginError.style.display = 'block';
  }

  loginBtn.addEventListener('click', doLogin);
  $('p').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    appScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
    $('u').value = ''; $('p').value = '';
    select.innerHTML = '<option value="">— Válassz oldalt —</option>';
    container.innerHTML = '<p class="empty">Válassz egy oldalt fent!</p>';
    saveBtn.disabled = true;
    previewBtn.style.display = 'none';
    currentSite = '';
  });

  function showApp(user) {
    loginScreen.style.display = 'none';
    appScreen.style.display = 'block';
    select.innerHTML = '<option value="">— Válassz oldalt —</option>';
    user.sites.forEach(s => {
      const o = document.createElement('option');
      o.value = s; o.textContent = SITE_LABELS[s] || s;
      select.appendChild(o);
    });
    if (user.sites.length === 1) {
      select.value = user.sites[0];
      select.dispatchEvent(new Event('change'));
    }
  }

  select.addEventListener('change', () => {
    currentSite = select.value;
    if (!currentSite) {
      container.innerHTML = '<p class="empty">Válassz egy oldalt fent!</p>';
      saveBtn.disabled = true; previewBtn.style.display = 'none'; return;
    }
    previewBtn.href = '/' + currentSite + '/';
    previewBtn.style.display = 'inline-block';
    loadFields(currentSite);
  });

  async function loadFields(site) {
    container.innerHTML = '<p class="empty">Betöltés...</p>';
    saveBtn.disabled = true; statusEl.textContent = '';
    const res = await fetch('/api/fields/' + site);
    if (!res.ok) { container.innerHTML = '<p class="empty" style="color:red">Hiba!</p>'; return; }
    const fields = await res.json();
    original = {};
    fields.forEach(f => original[f.key] = f.value);
    if (!fields.length) { container.innerHTML = '<p class="empty">Nincs szerkeszthető mező.</p>'; return; }

    const groups = {};
    fields.forEach(f => {
      const s = f.label.includes('–') ? f.label.split('–')[0].trim() : 'Egyéb';
      (groups[s] = groups[s] || []).push(f);
    });

    let html = '';
    for (const [sec, items] of Object.entries(groups)) {
      html += '<div class="section-heading">' + sec + '</div>';
      for (const f of items) {
        const hasHtml = /<[a-z]/i.test(f.value);
        const lbl = f.label.includes('–') ? f.label.split('–')[1].trim() : f.label;
        html += \`<div class="field">
          <label>\${lbl}</label>
          <textarea data-key="\${f.key}" rows="\${f.value.length > 100 ? 4 : 2}">\${esc(f.value)}</textarea>
          \${hasHtml ? '<div class="html-note">HTML tageket megtart (&lt;strong&gt;, &lt;br&gt; stb.)</div>' : ''}
        </div>\`;
      }
    }
    container.innerHTML = html;
    container.querySelectorAll('textarea').forEach(ta => {
      ta.addEventListener('input', () => {
        ta.classList.toggle('changed', ta.value !== original[ta.dataset.key]);
        saveBtn.disabled = false;
      });
    });
  }

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    statusEl.className = ''; statusEl.textContent = 'Mentés...';
    const updates = {};
    container.querySelectorAll('textarea').forEach(ta => updates[ta.dataset.key] = ta.value);
    const res = await fetch('/api/save/' + currentSite, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      statusEl.className = 'ok';
      statusEl.textContent = '✓ Mentve! Az oldal ~30 mp-en belül frissül.';
      container.querySelectorAll('textarea').forEach(ta => ta.classList.remove('changed'));
      Object.keys(updates).forEach(k => original[k] = updates[k]);
      setTimeout(() => { statusEl.textContent = ''; }, 6000);
    } else {
      const err = await res.json().catch(() => ({}));
      statusEl.className = 'err';
      statusEl.textContent = '✗ Hiba: ' + (err.error || 'ismeretlen');
    }
    saveBtn.disabled = false;
  });

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
</script>
</body>
</html>`);
});

// ── Export + local listen ─────────────────────────────────────────────────────
export default app;

if (require.main === module) {
  const PORT = 3333;
  app.listen(PORT, () => console.log(`\n  ✏️  Admin: http://localhost:${PORT}\n`));
}
