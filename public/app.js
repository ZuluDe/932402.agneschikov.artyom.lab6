const form = document.getElementById('filter-form');
const booksList = document.getElementById('books-list');
const resetBtn = document.getElementById('reset-btn');

async function loadBooks(author = '', year = '') {
  if (!booksList) return;

  const params = new URLSearchParams();
  if (author) params.append('author', author);
  if (year) params.append('year', year);

  try {
    const response = await fetch(`/api/books?${params.toString()}`);
    const books = await response.json();

    if (books.length === 0) {
      booksList.innerHTML = '<div class="card">Книги не найдены</div>';
      return;
    }

    booksList.innerHTML = books.map(book => `
      <div class="card">
        <div class="book-title">${book.title}</div>
        <div class="book-meta">Автор: ${book.author} | Год: ${book.year}</div>
      </div>
    `).join('');
  } catch (err) {
    booksList.innerHTML = '<div class="card">Ошибка загрузки данных</div>';
  }
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('author').value.trim();
    const year = document.getElementById('year').value.trim();
    loadBooks(author, year);
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    loadBooks();
  });

  loadBooks();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('Service Worker зарегистрирован'))
      .catch(err => console.error('Ошибка SW:', err));
  });
}