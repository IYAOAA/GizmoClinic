// netlify/functions/git-get.js
export async function handler(event) {
  try {
    const GITHUB_OWNER = process.env.GITHUB_OWNER; // e.g. "IYAOAA"
    const GITHUB_REPO = process.env.GITHUB_REPO;   // e.g. "1000HomeVibes"
    const token = process.env.GITHUB_TOKEN;
    if (!token) return { statusCode: 500, body: JSON.stringify({ message: 'GITHUB_TOKEN not set' }) };

    const query = event.queryStringParameters || {};
    const path = query.path || 'data/posts.json';
    const branch = query.branch || 'main';

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;

    const resp = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'netlify-function'
      }
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: resp.status, body: text };
    }

    const data = await resp.json(); // contains content (base64) and sha etc.
    return { statusCode: 200, body: JSON.stringify(data) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
}
