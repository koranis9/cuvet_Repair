const CACHE = 'repair-v5';
const FILES = [
  '/cuvet_Repair/',
  '/cuvet_Repair/index.html',
  '/cuvet_Repair/manifest.json',
  '/cuvet_Repair/icon-192.png'
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
self.addEventListener('fetch', e =>
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
);
