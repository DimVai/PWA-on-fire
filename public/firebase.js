'use strict';
/* global PWA */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging.js"; 
import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-remote-config.js";
import { getFirestore, collection, addDoc , serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"; 


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
// const analytics = getAnalytics(FirebaseApp);
const remoteConfig = getRemoteConfig(FirebaseApp);     
const messaging = getMessaging(FirebaseApp);




/***********************************    REMOTE CONFIG    ***********************************/

remoteConfig.settings.minimumFetchIntervalMillis = 1000*20;  // 20 seconds (for testing)
remoteConfig.defaultConfig = {
    "initialColor": "black"
};

// ΠΡΟΣΟΧΗ, πρέπει να πατήσεις publish μετά τις αλλαγές στο Firebase UI (backend), οχι απλώς να βάλεις τιμές. 

// console log the "before" or "offline" value
var squareColor = getValue(remoteConfig, "initialColor");
console.log(squareColor);
let rectangular = document.getElementById("rectangular");
// rectangular.style.background = window.squareColor._value;       // does nothing here!

// console log and use the "after" or "remote" value
fetchAndActivate(remoteConfig)
  .then(() => {
      squareColor = getValue(remoteConfig, "initialColor");
      console.log(squareColor);
      rectangular.style.background = squareColor._value;
      // if you want to store it for later, use localStorage. Else, if it is online, it will use the default one. 
  })
  .catch((err) => {
    // ...
  });




/************************   STORE PUSH SUBSCRIPTION TO DATABASE    **********************************/
window.storePushSubscription = async (subscriptionObject=PWA.PushSubscription) => {
    //////   OLD CODE   //////
    // let subsciptionObjectToSend = subscriptionObject;
    // subsciptionObjectToSend.timestamp = serverTimestamp();
    // // Add a new document with a generated id.
    // return await addDoc(collection(db, "pushSubscriptions"), subscriptionObject);
};




/**********************************    FIREBASE MESSAGING    ********************************/

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
// ifserviceWorkerRegistration is ommited, it will search for the file firebase-messaging-sw.js
PWA.registerFirebaseMessaging = (vapidKey,serviceWorkerRegistration) => {
    console.assert(serviceWorkerRegistration, "wrong service worker");
    getToken(messaging, { vapidKey, serviceWorkerRegistration }).then((firebaseMessagingToken) => {
        if (firebaseMessagingToken) {
          // Send the token to your server and update the UI if necessary
          console.log(`firebase messaging worked!`);
          console.log({firebaseMessagingToken});
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
};

