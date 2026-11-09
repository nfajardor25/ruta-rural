/* Ruta Rural · service worker
   Cada vez que se publica una actualización se cambia VERSION:
   así el celular detecta la versión nueva y Clara avisa "Actualizar". */
var VERSION = 'rr-1.1.0';
var ARCHIVOS = [
  './', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest',
  'data/materias.js', 'data/base.js', 'data/p1.js', 'data/p2.js', 'data/p3.js', 'data/p4.js', 'data/p5.js', 'data/p6_8.js',
  'data/casos.js', 'data/videos.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION && k.indexOf('rr-') === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('message', function (e) { if (e.data === 'activar') self.skipWaiting(); });

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Fuentes de Google: se guardan la primera vez para funcionar sin internet
  if (url.hostname.indexOf('fonts.') >= 0) {
    e.respondWith(caches.open('rr-fuentes').then(function (c) {
      return c.match(req).then(function (r) {
        var red = fetch(req).then(function (resp) { c.put(req, resp.clone()); return resp; }).catch(function () { return r; });
        return r || red;
      });
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Archivos de la app: primero lo guardado (rápido y sin internet)
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(function (r) {
    return r || fetch(req).catch(function () { return caches.match('index.html'); });
  }));
});
