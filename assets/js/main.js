// --- SET YOUR SUPABASE CREDENTIALS ---
const supabaseUrl = 'https://sqgnjqgsxeamvyciyezb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ25qcWdzeGVhbXZ5Y2l5ZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjQzNDAsImV4cCI6MjA3NDA0MDM0MH0.tUh66OFhvvhH48jaC9eyETTtUHKZd1NCr-7_EahERhQ';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

let allPosts = [];
let displayedPosts = 0;
const perPage = 6;
const postGrid = document.getElementById('postGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchBox = document.getElementById('searchBox');

async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });
  if (error) {
    console.error(error);
    postGrid.innerHTML = '<p>Error loading posts.</p>';
    return;
  }
  allPosts = data;
  renderPosts();
}

function renderPosts(filtered = null) {
  const list = filtered || allPosts;
  const slice = list.slice(0, displayedPosts + perPage);
  displayedPosts = slice.length;
  postGrid.innerHTML = slice.map(post => `
    <div class="post-card">
      <img src="${post.image || 'assets/img/default.jpg'}" alt="${post.title}">
      <div class="content">
        <h3><a href="solution.html?id=${post.id}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
        <div class="tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
  loadMoreBtn.style.display = displayedPosts >= list.length ? 'none' : 'block';
}

loadMoreBtn.addEventListener('click', () => renderPosts());
searchBox.addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = allPosts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q))
  );
  displayedPosts = 0;
  renderPosts(filtered);
});

fetchPosts();
