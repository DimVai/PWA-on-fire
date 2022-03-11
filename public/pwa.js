'use strict';



/** Object used for PWA functionality (caching, push notifications etc) */
var PWA = {
    /** The service worker registration is initially null but it gets a value on window load */
    ServiceWorkerRegistration: null,
    /** The object to be sent to server or database (if user grants permission for notifications)*/
    PushSubscription: null,
    /** The server's public key for the messaging service */
    ApplicationServerKey: 'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc',
    /** Creates or just returns the PushSubscription object. Asks user's permission */
    subscribeToPush: async function(serverKey=this.ApplicationServerKey){
        let pushSubscription = await this.ServiceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: serverKey,
        });
        this.PushSubscription = pushSubscription.toJSON();        // send this object to server or database
        return this.PushSubscription;
    },
    /** Sends the push subscription to server or database */
    sendPushSubscription: {},
    /** Used in showing a test notification */
    defaultPushSettings: {
        body: "This is the text of the notification",
        icon: "favicon.ico"
    },
    /** Shows a notification that is crated locally at the client, not sent by the server */
    testNotificationLocally: function(title="Local notification",pushSettings=this.defaultPushSettings){
        this.ServiceWorkerRegistration.showNotification(title, pushSettings)
    },
    // onPushReceived: function(){console.log("this is from the PWA Object")},  // implemented in sw file
};




/***********************************     LOAD THE SERVICE WORKER     ***********************************/


// on window load, register the service worker 
window.addEventListener('load', function(event) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration=>{
                console.debug('service worker registered', registration);
                PWA.ServiceWorkerRegistration = registration;       // to be used by Firebase messaging
                // firebase.messaging().useServiceWorker(registration);
                if (Notification.permission == "granted") {
                    // populate PWA.PushSubscription. It not create anything if permission==granted
                    PWA.subscribeToPush();      
                } else {
                    // it is NOT a good practice to ask for notification permission instantly:
                    // PWA.subscribeToPush();
                }
            })
            .catch(err=>console.debug('service worker not registered:',err));
    }
});



