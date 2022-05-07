'use strict';

////////// SCRIPT THAT RUNS MANUALLY BY ME WHEN I WANT TO SEND A PUSH NOTIFICATION
////////// NOT PART OF PAGE LOGIC. 


import WebPush from 'web-push';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAYhrOPJxTW6ao0RKqMGBtdOnpCvwr7xVI",
    authDomain: "progressive-app-on-fire.firebaseapp.com",
    projectId: "progressive-app-on-fire",
    storageBucket: "progressive-app-on-fire.appspot.com",
    messagingSenderId: "59043357546",
    appId: "1:59043357546:web:395dab142648ebbecf3b13",
    measurementId: "G-Y9F2G8DRFJ"
};
const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: 'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc',
  privateKey: 'dlflZwTIcZbHFwpiBPdDz5Ix5uH_yXpOngigPKXbyow'
};

WebPush.setVapidDetails( 'mailto:dvainanidis@gmail.com' , vapidKeys.publicKey , vapidKeys.privateKey );

/*
// This is the same output of calling JSON.stringify on a PushSubscription. Example: 
const pushSubscription = {
    endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiKmMAr5LGjTf45uYIoOlzhqk6kACQFVqthv_3sK2JMlHgwEFP-_PGhwyATpsqcDvwXioHE22TxuKv9DjbkhDL88gwpD_LzawWMIxI3mWdkE5uyMrUaZJJpYjuKDj52pSfcATy61PkxWfxqsuKa6u0Mta2aZfA-gQCk6OJx7sPL4tzACg',
    expirationTime: null,
    keys: {
        p256dh: 'BB0Z7SApGgAFsCHlYqh1XhnawCK45pwTsaj1OYfpvJz0cV7WIgcfk7ogb7w5du1KYPniM56pHKH0CxIDFAfNbh4',
        auth: 'h4AdrVtysmZaAUsfODaVOw',
    }
  };
sendNotification(pushSubscription, JSON.stringify({title: "Push from server", body: "custom text"}));
*/

/** the push "payload" */
const pushMessage = JSON.stringify({title: "Push from server", body: "text message that came from server"});

const pushSubscriptions = collection(db, "pushSubscriptions");
const querySnapshot = await getDocs(query(pushSubscriptions));       // jshint ignore:line

let pushNotificationPromises = [];  // array of promises in order to use Promise.allSettled
let index=0;   // so the first index++ would be 0

console.log("Push proccess started sending " + querySnapshot.docs.length + " push messages");
querySnapshot.forEach((pushObject) => {
    const pushSubscription = pushObject.data();
    pushNotificationPromises[index++] = WebPush.sendNotification(pushSubscription, pushMessage);     // store the pending promises
    // console.log(index,pushNotificationPromises[index],pushSubscription);
});
// console.log(pushNotificationPromises);


Promise.allSettled(pushNotificationPromises).then((values)=>{ 
    let results = values.map(value=>value.status);
    let successes = results.filter(result=>result==="fulfilled");
    let failures = results.filter(result=>result==="rejected");
    console.log("Push proccess completed with " + successes.length + " successes and " + failures.length + " failures");
    process.exit(0);
});
// allSettled = resolved or rejected
// On the contrary, Promise.all will reject immediately upon any of the input promises rejecting
// .catch(()=>{process.exit(1)});      // 0 is success, 1 is failure



