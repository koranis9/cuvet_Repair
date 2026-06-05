const CACHE = 'repair-v2';
// ปรับเส้นทางให้ถูกต้องตามโครงสร้าง GitHub Pages
const FILES = [
  '/cuvet_Repair/',
  '/cuvet_Repair/index.html',
  '/cuvet_Repair/manifest.json',
  '/cuvet_Repair/icon-192.png'
];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)))
);
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
