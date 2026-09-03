const CACHE = 'repair-v16';
const FILES = [
  '/cuvet_Repair/manifest.json',
  '/cuvet_Repair/icon-192.png'
  // ไม่ cache index.html
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('index.html') ||
      e.request.url.endsWith('/cuvet_Repair/') ||
      e.request.url.endsWith('/cuvet_Repair')) {
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
