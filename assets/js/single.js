// --- SET YOUR SUPABASE CREDENTIALS ---
const supabaseUrl = 'https://sqgnjqgsxeamvyciyezb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ25qcWdzeGVhbXZ5Y2l5ZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjQzNDAsImV4cCI6MjA3NDA0MDM0MH0.tUh66OFhvvhH48jaC9eyETTtUHKZd1NCr-7_EahERhQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const postId = getQueryParam('id');
const container = document.getElementById('postContainer');

async function fetchPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    container.innerHTML = '<p>Post not found.</p>';
    return;
  }

  const post = data;
  container.innerHTML = `
    <h1 class="post-title">${post.title}</h1>
    <p class="post-date">${new Date(post.date).toDateString()}</p>
    <img src="${post.image || 'assets/img/default.jpg'}" alt="${post.title}" class="post-image">
    <div class="tags">
      ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="post-content">${post.content}</div>
    ${post.video ? `<div style="margin-top:20px;">
      <iframe width="100%" height="400" src="${post.video}" frameborder="0" allowfullscreen></iframe>
    </div>` : ''}
    <a class="back-link" href="index.html">← Back to blog</a>
  `;
}

fetchPost(postId);
