self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('.*'),      //all files
  new workbox.strategies.StaleWhileRevalidate()
);

//prefer cache on external (starting with http/https) resources
// workbox.routing.registerRoute(
//   new RegExp('^(http).*'),    
//   new workbox.strategies.CacheFirst()
// );

//prefer internet on internal resources
// workbox.routing.registerRoute(
//   new RegExp('^(?!http).*'),
//   new workbox.strategies.NetworkFirst()
// );
