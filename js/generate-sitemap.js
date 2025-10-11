const fs = require('fs');
const posts = require('./data/posts.json');

const sitemapEntries = posts.map(post => `
  <url>
    <loc>https://iyaoaa.netlify.app/${post.content}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ Sitemap updated successfully!');
