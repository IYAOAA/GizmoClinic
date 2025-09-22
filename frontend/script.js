const postsContainer = document.getElementById('posts');

// Replace with your backend Render URL when deployed:
const backendURL = 'https://your-render-backend.onrender.com/posts';

fetch(backendURL)
  .then(res => res.json())
  .then(data => {
    postsContainer.innerHTML = data.map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </div>
    `).join('');
  })
  .catch(err => {
    postsContainer.innerHTML = '<p>Failed to load posts.</p>';
  });
