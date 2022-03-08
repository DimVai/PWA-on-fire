

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-remote-config.js";



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
const analytics = getAnalytics(FirebaseApp);
const remoteConfig = getRemoteConfig(FirebaseApp);     // after "FirebaseApp" initialization

remoteConfig.settings.minimumFetchIntervalMillis = 1000*20;  // 20 seconds (for testing)
remoteConfig.defaultConfig = {
    "initialColor": "black"
};


// ΠΡΟΣΟΧΗ, πρέπει να κάνεις publish τις αλλαγές στο firebase interface (backend), οχι απλώς να βάλεις τιμές. 

window.squareColor = getValue(remoteConfig, "initialColor");
console.log(window.squareColor);
// rectangular.style.background = window.squareColor._value;       // does nothing here!

fetchAndActivate(remoteConfig)
  .then(() => {
      window.squareColor = getValue(remoteConfig, "initialColor");
      console.log(window.squareColor);
      rectangular.style.background = window.squareColor._value;
  })
  .catch((err) => {
    // ...
  });


$(window).on('load',function() {
    $("#colbut").on('click',function(){
        $("#rectangular").css("background-color", $('#colorValue').val());
        $('#colorValue').focus();
    });
    $('#colorValue').on('keypress',function(e){
        if (e.keyCode==13) {$("#colbut").click();} //if you press enter
    });            
})