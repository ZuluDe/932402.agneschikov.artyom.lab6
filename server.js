const express = require('express');
const path = require('path');

const app = express();
const PORT = 1000;

app.use(express.static(path.join(__dirname, 'public')));

const books = [
  { title: 'War and Peace', author: 'Tolstoy', year: 1869 },
  { title: 'Anna Karenina', author: 'Tolstoy', year: 1877 },
  { title: 'Crime and Punishment', author: 'Dostoevsky', year: 1866 },
  { title: 'The Idiot', author: 'Dostoevsky', year: 1869 },
  { title: 'Fathers and Sons', author: 'Turgenev', year: 1862 }
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

app.get('/api/books', (req, res) => {
  const { author, year } = req.query;
  let result = books;

  if (author) {
    result = result.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (year) {
    result = result.filter(book => book.year === Number(year));
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});