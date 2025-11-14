// Minimal service worker for offline caching and PWA install

const CACHE_NAME = 'fractured-realm-cache-v3';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'sw.js',
  'fracturedrealmlogo.png'
  // Optional: add all page images if you want offline support
  // 'CARD_GAME–Rule_Set-01.png',
  // 'CARD_GAME–Rule_Set-02.png',
  // ...
  // 'CARD_GAME–Rule_Set-18.png'
];

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches if necessary
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
