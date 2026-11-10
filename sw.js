// Service worker sederhana: menyimpan "cangkang" pembungkus (halaman, ikon, manifest) agar aplikasi
// bisa dibuka & menampilkan pesan "tidak ada sinyal" saat offline. Data Kopdes tetap selalu dari internet.
const CACHE = 'so-harian-v1';
const CANGKANG = ['./', 'index.html', 'manifest.webmanifest', 'ikon-192.png', 'ikon-512.png', 'favicon-48.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CANGKANG)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Hanya file pembungkus di domain sendiri yang ditangani; aplikasi Apps Script (domain Google) tidak disentuh.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const salin = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, salin));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
