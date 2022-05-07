'use strict';



/** Object used for PWA functionality (caching, push notifications etc) */
var PWA = {
    /** The service worker registration is initially null but it gets a value on window load */
    ServiceWorkerRegistration: null,
    /** The object to be sent to server or database (if user grants permission for notifications)*/
    PushSubscription: null,
    /** The server's public key for the messaging service */
    ApplicationServerKey: 'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc',
    /** Creates the PushSubscription object or just returns it (if already exists)  */
    subscribeToPush: async function(serverKey=this.ApplicationServerKey){
        // if permission is not given already, ask for it and send subscription to server
        const willSendPushToServer = (Notification.permission != "granted");
        let pushSubscription = await this.ServiceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: serverKey,
        });
        let subsciptionObject = pushSubscription.toJSON();
        this.PushSubscription = subsciptionObject;        // send this object to server or database
        if (willSendPushToServer) {        
            await this.sendPushSubscription(subsciptionObject);
            console.log("Subscribed to push notifications",subsciptionObject);
        }
        if (this.registerFirebaseMessaging) {   // if the method has been initialized by user's code
            PWA.registerFirebaseMessaging(this.ApplicationServerKey,this.ServiceWorkerRegistration);
        }
        return subsciptionObject;
    },
    /** This method should be defined in other file (because requires firebase modules). Initializes Firebase Messaging */
    registerFirebaseMessaging: null,
    /** Sends the push subscription to server or database. In this template, I use another function. */
    sendPushSubscription: function(subsciptionObject=this.PushSubscription){window.storePushSubscription(subsciptionObject)},
    /** Used in showing a test notification */
    defaultPushSettings: {
        body: "This is the text of the notification",
        icon: "favicon.ico"
    },
    /** Shows a notification that is crated locally at the client, not sent by the server */
    testNotificationLocally: function(title="Local notification",pushSettings=this.defaultPushSettings){
        this.ServiceWorkerRegistration.showNotification(title, pushSettings);
    },
    // onPushReceived: function(){console.log("this is from the PWA Object")},  // implemented in sw file
};




/***********************************     LOAD THE SERVICE WORKER     ***********************************/


// on window load (after all scripts, including firebase.js, run), register the service worker 
window.addEventListener('load', function(event) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration=>{
                console.debug('service worker registered', registration);
                PWA.ServiceWorkerRegistration = registration;       // to be used also by Firebase messaging

                // it is configured to ask permission only on user's action, not on load. 
                if (Notification.permission == "granted") {
                    // This will not create anything new if permission==granted, just populate PWA.PushSubscription.
                    PWA.subscribeToPush();      
                } else {
                    // it is NOT a good practice to ask for notification permission instantly. Do not do this:
                    // PWA.subscribeToPush();
                }
            })
            .catch(err=>console.debug('service worker not registered:',err));
    }
});



