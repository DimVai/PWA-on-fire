// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-remote-config.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging.js"; 
import { getFirestore, doc, setDoc, collection, addDoc , serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"; 


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYhrOPJxTW6ao0RKqMGBtdOnpCvwr7xVI",
    authDomain: "progressive-app-on-fire.firebaseapp.com",
    projectId: "progressive-app-on-fire",
    storageBucket: "progressive-app-on-fire.appspot.com",
    messagingSenderId: "59043357546",
    appId: "1:59043357546:web:395dab142648ebbecf3b13",
    measurementId: "G-Y9F2G8DRFJ"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
// the following must be AFTER "FirebaseApp" initialization:
window.db = getFirestore(FirebaseApp);
const analytics = getAnalytics(FirebaseApp);
const remoteConfig = getRemoteConfig(FirebaseApp);     
const messaging = getMessaging(FirebaseApp);




/***********************************    REMOTE CONFIG    ***********************************/

remoteConfig.settings.minimumFetchIntervalMillis = 1000*20;  // 20 seconds (for testing)
remoteConfig.defaultConfig = {
    "initialColor": "black"
};

// ΠΡΟΣΟΧΗ, πρέπει να πατήσεις publish μετά τις αλλαγές στο Firebase UI (backend), οχι απλώς να βάλεις τιμές. 

// console log the "before" or "offline" value
window.squareColor = getValue(remoteConfig, "initialColor");
console.log(window.squareColor);
// rectangular.style.background = window.squareColor._value;       // does nothing here!

// console log and use the "after" or "remote" value
fetchAndActivate(remoteConfig)
  .then(() => {
      window.squareColor = getValue(remoteConfig, "initialColor");
      console.log(window.squareColor);
      rectangular.style.background = window.squareColor._value;
      // if you want to store it for later, use localStorage. Else, if it is online, it will use the default one. 
  })
  .catch((err) => {
    // ...
  });





/**********************************    CLOUD MESSAGING    **********************************/
window.storePushSubscription = async (subscriptionObject=PWA.PushSubscription) => {
    let subsciptionObjectToSend = subscriptionObject;
    subsciptionObjectToSend.timestamp = serverTimestamp();
    // Add a new document with a generated id.
    return await addDoc(collection(db, "pushSubscriptions"), subscriptionObject);
};



/**********************************    CLOUD MESSAGING    **********************************/


// Add the public key generated from the console here.
// Get registration token. Initially this makes a network call, once retrieved, subsequent calls to getToken will return from cache.
// BUT: messaging uses a service worker but you can't have more than one service worker in an WPA. So,
// either pass your app's original Service Worker Registration or 
// you need to have a firebase-messaging-sw.js at your root location (see documentation)
/*
getToken(messaging, {serviceWorkerRegistration: window.appServiceWorkerRegistration, vapidKey:'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc'})
    .then((currentToken) => {
        if (currentToken) {
            console.log("currentToken: ",currentToken);
            // Send the token to your server and update the UI if necessary
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
        }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
});
*/



/***********************************     APP CODE     ***********************************/

$(window).on('load',function() {
    $("#colbut").on('click',function(){
        $("#rectangular").css("background-color", $('#colorValue').val());
        $('#colorValue').focus();
    });
    $('#colorValue').on('keypress',function(e){
        if (e.keyCode==13) {$("#colbut").click();} //if you press enter
    });            
})

let subscribeButtonTimesClicked = 0;
subscribeButton.addEventListener('click',()=>{
    PWA.subscribeToPush();
    subscribeButtonTimesClicked++;
    if (subscribeButtonTimesClicked==3) {
    subscribeButton.textContent = "force send!"
    } else if (subscribeButtonTimesClicked==4) {
        storePushSubscription()
        console.log("subscription sent again");
        subscribeButton.style.display = "none";
    }
})