const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: 'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc',
  privateKey: 'dlflZwTIcZbHFwpiBPdDz5Ix5uH_yXpOngigPKXbyow'
};

webpush.setVapidDetails( 'mailto:dvainanidis@gmail.com' , vapidKeys.publicKey , vapidKeys.privateKey );

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
    endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiKmMAr5LGjTf45uYIoOlzhqk6kACQFVqthv_3sK2JMlHgwEFP-_PGhwyATpsqcDvwXioHE22TxuKv9DjbkhDL88gwpD_LzawWMIxI3mWdkE5uyMrUaZJJpYjuKDj52pSfcATy61PkxWfxqsuKa6u0Mta2aZfA-gQCk6OJx7sPL4tzACg',
    expirationTime: null,
    keys: {
        p256dh: 'BB0Z7SApGgAFsCHlYqh1XhnawCK45pwTsaj1OYfpvJz0cV7WIgcfk7ogb7w5du1KYPniM56pHKH0CxIDFAfNbh4',
        auth: 'h4AdrVtysmZaAUsfODaVOw',
    }
  };
webpush.sendNotification(pushSubscription, JSON.stringify({title: "Push from server", body: "custom text"}));