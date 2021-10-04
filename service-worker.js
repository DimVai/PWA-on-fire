/* jshint ignore:start */
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

let regExpContains = (array) => new RegExp('.*('+array.join('|')+').*');
let regExpContainsNot = (array) => new RegExp('^(?!.*('+array.join('|')+')).*');

//prefer cache on external (containing words like cdn, npm or googleapis) resources
workbox.routing.registerRoute(
  regExpContains(["cdn","npm","googleapis"]),    
  new workbox.strategies.CacheFirst()
);

//prefer internet on internal resources
workbox.routing.registerRoute(
  regExpContainsNot(["cdn","npm","googleapis"]),   
  new workbox.strategies.NetworkFirst()
);
