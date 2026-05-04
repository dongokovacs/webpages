import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

// ── Types ─────────────────────────────────────────────────────────────────────
interface UserConfig {
  password: string;
  sites: string[];
}

declare module 'express-session' {
  interface SessionData {
    username: string;
    sites: string[];
  }
}

// ── Config ────────────────────────────────────────────────────────────────────
const ROOT = path.resolve(process.cwd(), '..');

const USERS: Record<string, UserConfig> = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../users.json'), 'utf-8')
);

const SITES: Record<string, { label: string; file: string }> = {
  galiba: {
    label: 'Galiba Társulat',
    file: path.join(ROOT, 'galiba/index.html'),
  },
  'bube-viragbolt': {
    label: 'Bübe virágbolt',
    file: path.join(ROOT, 'bube-viragbolt/index.html'),
  },
};

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use(session({
  secret: 'galiba-admin-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 óra
}));

// Preview static routes (session-protected middleware below)
app.use('/preview/galiba', express.static(path.join(ROOT, 'galiba')));
app.use('/preview/bube-viragbolt', express.static(path.join(ROOT, 'bube-viragbolt')));

// ── Auth middleware ───────────────────────────────────────────────────────────
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.username) return next();
  res.status(401).json({ error: 'Nincs bejelentkezve' });
}

function requireSiteAccess(req: Request, res: Response, next: NextFunction) {
  const site = req.params.site;
  if (!req.session.sites?.includes(site)) {
    res.status(403).json({ error: 'Nincs hozzáférés ehhez az oldalhoz' });
    return;
  }
  next();
}

// ── API: login ────────────────────────────────────────────────────────────────
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };
  const user = USERS[username];
  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó' });
    return;
  }
  req.session.username = username;
  req.session.sites = user.sites;
  res.json({ username, sites: user.sites });
});

// ── API: logout ───────────────────────────────────────────────────────────────
app.post('/api/logout', (req: Request, res: Response) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// ── API: me ───────────────────────────────────────────────────────────────────
app.get('/api/me', (req: Request, res: Response) => {
  if (!req.session.username) {
    res.status(401).json({ error: 'Nincs bejelentkezve' });
    return;
  }
  res.json({ username: req.session.username, sites: req.session.sites });
});

// ── API: get fields ───────────────────────────────────────────────────────────
app.get('/api/fields/:site', requireAuth, requireSiteAccess, (req: Request, res: Response) => {
  const site = SITES[req.params.site];
  if (!site || !fs.existsSync(site.file)) {
    res.status(404).json({ error: 'Site not found' });
    return;
  }
  const html = fs.readFileSync(site.file, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });
  const fields: { key: string; label: string; value: string }[] = [];
  $('[data-editable]').each((_: number, el: cheerio.Element) => {
    const key = $(el).attr('data-editable')!;
    const label = $(el).attr('data-label') || key;
    const value = $(el).html()?.trim() ?? '';
    fields.push({ key, label, value });
  });
  res.json(fields);
});

// ── API: save fields ──────────────────────────────────────────────────────────
app.post('/api/save/:site', requireAuth, requireSiteAccess, (req: Request, res: Response) => {
  const site = SITES[req.params.site];
  if (!site || !fs.existsSync(site.file)) {
    res.status(404).json({ error: 'Site not found' });
    return;
  }
  const updates: Record<string, string> = req.body;
  const html = fs.readFileSync(site.file, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });
  Object.entries(updates).forEach(([key, value]) => {
    $(`[data-editable="${key}"]`).html(value);
  });
  fs.writeFileSync(site.file, $.html(), 'utf-8');
  res.json({ ok: true });
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

    /* ── Login ── */
    #login-screen {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
    }
    .login-card {
      background: #fff; border-radius: 16px;
      padding: 2.5rem 2rem; width: 100%; max-width: 360px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.10);
    }
    .login-card h1 { font-size: 1.3rem; font-weight: 800; margin-bottom: 0.4rem; }
    .login-card p { font-size: 0.9rem; color: #888; margin-bottom: 1.8rem; }
    .login-field { margin-bottom: 1rem; }
    .login-field label { display: block; font-size: 0.82rem; font-weight: 700; color: #555; margin-bottom: 0.3rem; }
    .login-field input {
      width: 100%; padding: 0.65rem 0.9rem;
      border: 2px solid #ddd; border-radius: 8px;
      font-size: 1rem; font-family: inherit;
      transition: border-color 0.15s;
    }
    .login-field input:focus { outline: none; border-color: #f4720a; }
    #login-btn {
      width: 100%; margin-top: 0.5rem;
      background: #f4720a; color: #fff;
      border: none; border-radius: 10px;
      padding: 0.75rem; font-size: 1rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
    }
    #login-btn:hover { background: #c85500; }
    #login-error { color: #dc2626; font-size: 0.85rem; font-weight: 600; margin-top: 0.8rem; display: none; }

    /* ── App ── */
    #app-screen { display: none; }

    header {
      background: #1a1a1a; color: #fff;
      padding: 1rem 2rem;
      display: flex; align-items: center; gap: 1rem;
    }
    header h1 { font-size: 1.2rem; font-weight: 700; }

    #preview-btn {
      margin-left: auto; margin-right: 0.5rem;
      padding: 0.5rem 1.2rem; border-radius: 8px;
      background: #fff; color: #1a1a1a;
      font-size: 0.9rem; font-weight: 700;
      text-decoration: none; white-space: nowrap;
      display: none;
    }
    #logout-btn {
      padding: 0.5rem 1rem; border-radius: 8px;
      background: transparent; color: #aaa;
      border: 1px solid #444; font-size: 0.85rem;
      cursor: pointer; white-space: nowrap;
    }
    #logout-btn:hover { color: #fff; border-color: #888; }

    header select {
      padding: 0.5rem 1rem; border-radius: 8px;
      border: none; font-size: 1rem; cursor: pointer;
    }

    main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }

    .section-heading {
      font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em;
      text-transform: uppercase; color: #888;
      margin: 2rem 0 0.75rem; padding-bottom: 0.4rem;
      border-bottom: 2px solid #e0e0e0;
    }
    .field { margin-bottom: 1rem; }
    .field label { display: block; font-size: 0.85rem; font-weight: 700; color: #444; margin-bottom: 0.3rem; }
    .field textarea {
      width: 100%; padding: 0.6rem 0.8rem;
      border: 2px solid #ddd; border-radius: 8px;
      font-size: 0.95rem; font-family: inherit;
      resize: vertical; min-height: 52px;
      transition: border-color 0.15s;
    }
    .field textarea:focus { outline: none; border-color: #f4720a; }
    .field textarea.changed { border-color: #f4720a; background: #fff8f4; }
    .html-note { font-size: 0.75rem; color: #aaa; margin-top: 0.2rem; }

    .save-bar {
      position: sticky; bottom: 0;
      background: #fff; border-top: 2px solid #eee;
      padding: 1rem; display: flex; gap: 1rem; align-items: center;
      margin-top: 2rem;
    }
    #save-btn {
      background: #f4720a; color: #fff;
      border: none; border-radius: 10px;
      padding: 0.75rem 2rem; font-size: 1rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
    }
    #save-btn:hover { background: #c85500; }
    #save-btn:disabled { background: #ccc; cursor: default; }
    #status { font-size: 0.9rem; font-weight: 600; color: #888; }
    #status.ok { color: #16a34a; }
    #status.err { color: #dc2626; }
    .empty { text-align: center; color: #aaa; padding: 4rem; }
  </style>
</head>
<body>

<!-- Login -->
<div id="login-screen">
  <div class="login-card">
    <h1>✏️ Weboldal szerkesztő</h1>
    <p>Jelentkezz be a szerkesztéshez</p>
    <div class="login-field">
      <label for="username">Felhasználónév</label>
      <input id="username" type="text" autocomplete="username" />
    </div>
    <div class="login-field">
      <label for="password">Jelszó</label>
      <input id="password" type="password" autocomplete="current-password" />
    </div>
    <button id="login-btn">Belépés</button>
    <div id="login-error">Hibás felhasználónév vagy jelszó</div>
  </div>
</div>

<!-- App -->
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
  const SITE_LABELS = {
    'galiba': 'Galiba Társulat',
    'bube-viragbolt': 'Bübe virágbolt',
  };

  const loginScreen = document.getElementById('login-screen');
  const appScreen   = document.getElementById('app-screen');
  const loginBtn    = document.getElementById('login-btn');
  const loginError  = document.getElementById('login-error');
  const logoutBtn   = document.getElementById('logout-btn');
  const select      = document.getElementById('site-select');
  const container   = document.getElementById('fields');
  const saveBtn     = document.getElementById('save-btn');
  const statusEl    = document.getElementById('status');
  const previewBtn  = document.getElementById('preview-btn');

  let currentSite = '';
  let original = {};

  // ── Init: check if already logged in ──
  (async () => {
    const res = await fetch('/api/me');
    if (res.ok) {
      const user = await res.json();
      showApp(user);
    }
  })();

  // ── Login ──
  async function doLogin() {
    loginError.style.display = 'none';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const user = await res.json();
      showApp(user);
    } else {
      loginError.style.display = 'block';
    }
  }

  loginBtn.addEventListener('click', doLogin);
  document.getElementById('password').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
  });

  // ── Logout ──
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    appScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    select.innerHTML = '<option value="">— Válassz oldalt —</option>';
    container.innerHTML = '<p class="empty">Válassz egy oldalt fent!</p>';
    saveBtn.disabled = true;
    previewBtn.style.display = 'none';
    currentSite = '';
  });

  // ── Show app after login ──
  function showApp(user) {
    loginScreen.style.display = 'none';
    appScreen.style.display = 'block';
    select.innerHTML = '<option value="">— Válassz oldalt —</option>';
    user.sites.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = SITE_LABELS[s] || s;
      select.appendChild(opt);
    });
    // Auto-select if only one site
    if (user.sites.length === 1) {
      select.value = user.sites[0];
      select.dispatchEvent(new Event('change'));
    }
  }

  // ── Site select ──
  select.addEventListener('change', () => {
    currentSite = select.value;
    if (!currentSite) {
      container.innerHTML = '<p class="empty">Válassz egy oldalt fent!</p>';
      saveBtn.disabled = true;
      previewBtn.style.display = 'none';
      return;
    }
    previewBtn.href = '/preview/' + currentSite + '/';
    previewBtn.style.display = 'inline-block';
    loadFields(currentSite);
  });

  // ── Load fields ──
  async function loadFields(site) {
    container.innerHTML = '<p class="empty">Betöltés...</p>';
    saveBtn.disabled = true;
    statusEl.textContent = '';

    const res = await fetch('/api/fields/' + site);
    if (!res.ok) {
      container.innerHTML = '<p class="empty" style="color:red">Hiba a betöltéskor!</p>';
      return;
    }

    const fields = await res.json();
    original = {};
    fields.forEach(f => original[f.key] = f.value);

    if (fields.length === 0) {
      container.innerHTML = '<p class="empty">Nincs szerkeszthető mező ezen az oldalon.</p>';
      return;
    }

    const groups = {};
    fields.forEach(f => {
      const section = f.label.includes('–') ? f.label.split('–')[0].trim() : 'Egyéb';
      if (!groups[section]) groups[section] = [];
      groups[section].push(f);
    });

    let html = '';
    for (const [section, items] of Object.entries(groups)) {
      html += '<div class="section-heading">' + section + '</div>';
      for (const f of items) {
        const hasHtml = /<[a-z]/.test(f.value);
        html += \`<div class="field">
          <label>\${f.label.includes('–') ? f.label.split('–')[1].trim() : f.label}</label>
          <textarea data-key="\${f.key}" rows="\${f.value.length > 100 ? 4 : 2}">\${esc(f.value)}</textarea>
          \${hasHtml ? '<div class="html-note">HTML tageket megtart a rendszer (&lt;strong&gt;, &lt;br&gt; stb.)</div>' : ''}
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

  // ── Save ──
  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true;
    statusEl.className = '';
    statusEl.textContent = 'Mentés...';

    const updates = {};
    container.querySelectorAll('textarea').forEach(ta => {
      updates[ta.dataset.key] = ta.value;
    });

    const res = await fetch('/api/save/' + currentSite, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      statusEl.className = 'ok';
      statusEl.textContent = '✓ Mentve!';
      container.querySelectorAll('textarea').forEach(ta => ta.classList.remove('changed'));
      Object.keys(updates).forEach(k => original[k] = updates[k]);
      setTimeout(() => { statusEl.textContent = ''; }, 3000);
    } else {
      statusEl.className = 'err';
      statusEl.textContent = '✗ Hiba a mentéskor!';
    }
    saveBtn.disabled = false;
  });

  function esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
</script>
</body>
</html>`);
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`\n  ✏️  Admin szerkesztő: http://localhost:${PORT}\n`);
});
