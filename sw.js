const CACHE_NAME = "fractured-realm-cache-v11";

const base = "/Fractured-Realm-Rulebook/";

const urlsToCache = [
  base,
  base + "index.html",
  base + "manifest.json",
  base + "sw.js",
  base + "fracturedrealmlogo.png",
  base + "01.png",
  base + "02.png",
  base + "03.png",
  base + "04.png",
  base + "05.png",
  base + "06.png",
  base + "07.png",
  base + "08.png",
  base + "09.png",
  base + "10.png",
  base + "11.png",
  base + "12.png",
  base + "13.png",
  base + "14.png",
  base + "15.png",
  base + "16.png",
  base + "17.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});


