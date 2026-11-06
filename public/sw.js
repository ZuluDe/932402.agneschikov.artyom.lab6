const CACHE_NAME = 'books-v1';
const ASSETS = [
  '/',
  '/about',
  '/index.html',
  '/about.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/api/books'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});