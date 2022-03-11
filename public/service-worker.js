'use strict';



/***********************************     INITIALIZING     ***********************************/

// import Workbox
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// disable console logs
workbox.setConfig({ debug: false });   

// You must delete the following line if you are using lazy-loading of versioned, pre-cached assets
// or have other problems when updating the service worker. 
// Else, it is recommended to do skipWaiting.
// (skipWaiting: activate the new version of service worker now, instead of waiting for the next session to do so)
self.addEventListener('install', event => { self.skipWaiting() });

// when the new updated service worker (this file) gets activated
self.addEventListener('activate', event => { 
    // event.waitUntil( /* caching and other things to do before it is being installed */ );
    console.debug('Service worker activated: ', event);
});



/***********************************     RECEIVE PUSH     ***********************************/
// ΠΡΟΣΟΧΗ: Αν γίνει error, δεν θα ειδοποιηθείς και οι επόμενες εντολές δεν θα εκτελεστούν και θα νομίζεις οτι φταίνε εκείνες αλλά φταίει κάποια προηγούμενη! 
self.addEventListener('push', (pushEvent) => {
    const pushData = pushEvent.data.json();
    // console.log(JSON.stringify(pushData));
    self.registration.showNotification(pushData.title, { body: pushData?.body??"PWA Notification", icon: pushData?.icon??"favicon.ico" });
});




/***********************************     CACHING SETTINGS     ***********************************/

// just helper functions
let regExpContains = (array) => new RegExp('.*('+array.join('|')+').*');
let regExpContainsNot = (array) => new RegExp('^(?!.*('+array.join('|')+')).*');

/** An array of strings that belong to local filenames that will never change */
let unchangedResources = ['bootstrap','jquery'];
/** An array of strings that indicate external resources */
let externalResources = ["cdn","npm","googleapis","unpkg","jsdelivr"];

// 1. prefer cache on unchanged resources
workbox.routing.registerRoute(
    regExpContains(unchangedResources),    
    new workbox.strategies.CacheFirst()
);

// 2. prefer cache and updating on external resources
// keep in mind that you should never use CacheFirst/CacheOnly on external resources! 
workbox.routing.registerRoute(
    regExpContains(externalResources),    
    new workbox.strategies.StaleWhileRevalidate()       // Alternatively: NetworkFirst()
);

// 3. prefer internet on other resources that are frequently updated  
workbox.routing.registerRoute(
    regExpContainsNot([...unchangedResources,...externalResources]),   
    new workbox.strategies.NetworkFirst()     // Alternatively: StaleWhileRevalidate()
); 
