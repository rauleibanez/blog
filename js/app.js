/*
 | ------------+-------------------------------------------
 | Archivo     | app.js
 | Descripcion | Archivo JavaScript para la funcionalidad de   
 |             | la seccion del Perfil (index.html)
 | Autor       | Raul Ibañez M.
 | Version     | 2.0
 | Fecha       | 07/09/2024 
 |             | Actualización y refactorización 21/09/2025
 | ------------+--------------------------------------------
*/
let currentSection = 'portfolio';


function showSection(section) {
  document.getElementById(currentSection).classList.add('hidden');
  document.getElementById(section).classList.remove('hidden');
  currentSection = section;
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

async function loadPortfolio() {
  const res = await fetch('data/info.json');
  const data = await res.json();
  const container = document.getElementById('portfolio');

  // Tarjeta de perfil
  const profileHTML = `
    <div class="profile-card">
      <div class="profile-photo">
      <img src="${data.profile.photo}" alt="Foto de ${data.profile.name}" />
      </div>
      <div class="profile-info">
        <h2>${data.profile.name}</h2>
        <h4>${data.profile.title}</h4>
        <p>${data.profile.pitch}</p>
        <a href="${data.profile.linkedin}" target="_blank" class="social-button">
           <i class="fab fa-linkedin"></i> Conectar en LinkedIn
        </a>
        <a href="${data.profile.telegram}" target="_blank" class="social-button">
          <i class="fab fa-telegram-plane"></i> Chatear en Telegram
        </a>

      </div>
    </div>
  `;
  const sectionTitleHTML = `
    <h2 class="section-title">Proyectos</h2>
  `;
  // Tarjetas de proyectos
  const projectsHTML = data.projects.map(project => `
    <div class="project-card">
       <div class="project-image">
          <img src="${project.image}" alt="Imagen de ${project.title}" />
       </div>
       <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.repo}" target="_blank"><i class="fab fa-github"></i> Ver en GitHub</a>
        </div>
     </div>
  `).join('');

  container.innerHTML = profileHTML + sectionTitleHTML + projectsHTML;
}
/*
 * Nseu
async function loadBlog() {
  const res = await fetch('data/posts.json');
  const posts = await res.json();
  const container = document.getElementById('blog');
  container.innerHTML = posts.map(post => `
    <div class="card" onclick="togglePost(this)">
      <h3>${post.title}</h3>
      <div class="post-content" style="display:none;">${post.content}</div>
    </div>
  `).join('');
}
*/
function togglePost(card) {
  const content = card.querySelector('.post-content');
  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  card.classList.toggle('expanded');
}
/*----------------*/
let currentPage = 1;
const postsPerPage = 3;

async function loadBlog() {
  const res = await fetch('data/posts.json');
  const posts = await res.json();
  renderBlog(posts);
}

function renderBlog(posts) {
  const container = document.getElementById('blog');
  container.innerHTML = '';

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  paginatedPosts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
  <h3>${post.title}</h3>
  <div class="blog-meta">📅 ${post.date} | 🗂️ ${post.category}</div>
  <div class="post-content" style="display:none;">${post.content}</div>
  <div class="blog-tags">
    ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
  </div>
`;

    card.onclick = () => togglePost(card);
    container.appendChild(card);
  });

  renderPagination(posts.length);
}

function renderPagination(totalPosts) {
  const container = document.getElementById('blog');
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pagination = document.createElement('div');
  pagination.className = 'pagination';

  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '« Anterior';
    prevBtn.onclick = () => {
      currentPage--;
      loadBlog();
    };
    pagination.appendChild(prevBtn);
  }

  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente »';
    nextBtn.onclick = () => {
      currentPage++;
      loadBlog();
    };
    pagination.appendChild(nextBtn);
  }

  container.appendChild(pagination);
}


/*----------------*/

loadPortfolio();
loadBlog();
