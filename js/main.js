/*
 | ------------+-------------------------------------------
 | Archivo     | main.js
 | Descripcion | Archivo JavaScript para la funcionalidad de   
 |             | la  pagina del Blog (index.html)
 | Autor       | Raul Ibañez
 | Version     | 1.0
 | Fecha       | 05/09/2024 
 | ------------+--------------------------------------------
*/
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');
  const themeToggle = document.getElementById('theme-toggle');
  const themeLink = document.getElementById('theme-link');
  const searchButton = document.getElementById('search-button');
  const searchModal = document.getElementById('search-modal');
  const closeButton = document.querySelector('.close-button');
  const modalSearchInput = document.getElementById('modal-search-input');
  const modalSearchButton = document.getElementById('modal-search-button');
  const blogLink = document.getElementById('blog-link');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');


  let posts = [];
  let currentPage = 1;
  const postsPerPage = 3;

  fetch('data/posts.json')
    .then(response => response.json())
    .then(data => {      
      posts = data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha más reciente
      displayPosts(posts, currentPage);
      updatePaginationControls();
    });

  searchButton.addEventListener('click', () => {
    searchModal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    searchModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === searchModal) {
      searchModal.style.display = 'none';
    }
  });

  modalSearchButton.addEventListener('click', () => {
    const query = modalSearchInput.value.toLowerCase();
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query) || post.tags.some(tag => tag.toLowerCase().includes(query)));
    displayPosts(filteredPosts, currentPage);
    searchModal.style.display = 'none';
  });

  blogLink.addEventListener('click', (event) => {
    event.preventDefault();
    displayPosts(posts, currentPage);
    updatePaginationControls();
  });

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayPosts(posts, currentPage);
      updatePaginationControls();
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      currentPage++;
      displayPosts(posts, currentPage);
      updatePaginationControls();
    }
  });

  themeToggle.addEventListener('click', () => {
    if (themeLink.getAttribute('href') === 'css/light-theme.css') {
      themeLink.setAttribute('href', 'css/dark-theme.css');
    } else {
      themeLink.setAttribute('href', 'css/light-theme.css');
    }
  });

  function displayPosts(posts, page) {
    postsContainer.innerHTML = '';
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    paginatedPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const postTitle = document.createElement('p');
      postTitle.classList.add('post-title');
      postTitle.textContent = post.title;
      postTitle.addEventListener('click', () => {
        const content = postElement.querySelector('.post-content');
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
      });

      const postDate = document.createElement('p');
      postDate.classList.add('post-date');
      postDate.textContent = `${new Date(post.date).toLocaleDateString()}`;

      const postContent = document.createElement('div');
      postContent.classList.add('post-content');
      postContent.innerHTML = post.content; // Usamos innerHTML para renderizar HTML

      const postTags = document.createElement('p');
      postTags.classList.add('post-tags');
      postTags.textContent = `Tags: ${post.tags.join(', ')}`;

      postElement.appendChild(postTitle);
      postElement.appendChild(postDate);
      postElement.appendChild(postContent);
      postElement.appendChild(postTags);
      postsContainer.appendChild(postElement);
    });
  }

  function updatePaginationControls() {
    pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(posts.length / postsPerPage)}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(posts.length / postsPerPage);
  }

});
