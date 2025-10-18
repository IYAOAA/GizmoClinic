// netlify/functions/savePost.js

import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;
    const filePath = "data/posts.json";
    const posts = JSON.parse(event.body);

    // 1️⃣ Get current posts.json
    const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const data = await res.json();

    // 2️⃣ Encode new content
    const updatedContent = Buffer.from(JSON.stringify(posts, null, 2)).toString("base64");

    // 3️⃣ Commit to GitHub
    await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Add new post from admin.html",
        content: updatedContent,
        sha: data.sha
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "✅ Post saved successfully" })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message })
    };
  }
}
