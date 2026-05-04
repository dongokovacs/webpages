const OWNER = process.env.GITHUB_OWNER || 'dongokovacs';
const REPO  = process.env.GITHUB_REPO  || 'webpages';
const BASE  = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'webpages-admin',
  };
}

export async function readFile(filePath: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(`${BASE}/${filePath}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${filePath}`);
  const data = await res.json() as { content: string; sha: string };
  return {
    content: Buffer.from(data.content.replace(/\s/g, ''), 'base64').toString('utf-8'),
    sha: data.sha,
  };
}

export async function writeFile(filePath: string, content: string, sha: string): Promise<void> {
  const res = await fetch(`${BASE}/${filePath}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message: `admin: update ${filePath}`,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      sha,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${body}`);
  }
}
