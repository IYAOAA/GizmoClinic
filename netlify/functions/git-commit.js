// netlify/functions/git-commit.js
export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
    }

    const GITHUB_OWNER = process.env.GITHUB_OWNER;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    if (!token || !GITHUB_OWNER || !GITHUB_REPO) {
      return { statusCode: 500, body: JSON.stringify({ message: 'Missing repository environment variables' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const filePath = body.filePath || 'data/posts.json';
    const branch = body.branch || 'main';
    const commitMessage = body.commitMessage || `Update ${filePath}`;
    const contentText = body.content || '';

    // 1) get current file to obtain sha (if exists)
    const getUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}?ref=${encodeURIComponent(branch)}`;
    const getResp = await fetch(getUrl, {
      headers: { Authorization: `token ${token}`, 'User-Agent': 'netlify-function' }
    });

    let sha = undefined;
    if (getResp.ok) {
      const getData = await getResp.json();
      sha = getData.sha;
    } else if (getResp.status === 404) {
      // New file, sha stays undefined
    } else {
      const respText = await getResp.text();
      return { statusCode: getResp.status, body: respText };
    }

    // 2) PUT new content (base64 encoded)
    const putUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}`;
    const payload = {
      message: commitMessage,
      content: Buffer.from(contentText, 'utf8').toString('base64'),
      branch
    };
    if (sha) payload.sha = sha;

    const putResp = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'netlify-function',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const putData = await putResp.json();
    if (!putResp.ok) {
      return { statusCode: putResp.status, body: JSON.stringify(putData) };
    }

    return { statusCode: 200, body: JSON.stringify(putData) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
}
