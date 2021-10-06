/* jshint ignore:start */
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

let regExpContains = (array) => new RegExp('.*('+array.join('|')+').*');
let regExpContainsNot = (array) => new RegExp('^(?!.*('+array.join('|')+')).*');

/** An array of strings that when appear on resourses URL, it is serverd from cache  */
let cacheFirstArray = ["cdn","npm","googleapis","unpkg","jsdelivr"];

//prefer cache on external (containing words like cdn, npm or googleapis) resources
workbox.routing.registerRoute(
  regExpContains(cacheFirstArray),    
  new workbox.strategies.CacheFirst()
);

//prefer internet on internal resources
workbox.routing.registerRoute(
  regExpContainsNot(cacheFirstArray),   
  new workbox.strategies.NetworkFirst()     //Alternatively: strategies.StaleWhileRevalidate()
); 
