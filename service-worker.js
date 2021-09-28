'use strict';

self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// This will work!

workbox.routing.registerRoute(
    new RegExp('/index.html$'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.+\\.js$'),
    new workbox.strategies.NetworkFirst()
  );

workbox.routing.registerRoute(
    new RegExp('.+\\.json$'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.+\\.css$'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.+\\.png$'),
    new workbox.strategies.NetworkFirst()
);

/*
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      return cache.add('index.html');
    })
  );
});
 
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
*/