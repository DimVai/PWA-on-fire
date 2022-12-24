const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey:
    'BND94p-OAukaXBvJ2WtZUe5PALL1RF9IkU1z4XlGhtsJ-XnKagF4eyPbggJc8p8MVTVp_KMbq6BrENhAGoqzCkc',
  privateKey: 'dlflZwTIcZbHFwpiBPdDz5Ix5uH_yXpOngigPKXbyow'
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/esuN7ylMeSY:APA91bEQaGAYl_mfimAQg6q0OisIHDkobC6JZ5eX_yJUW3Yv7mxMq1CQn1g5IzPRQeRo2kN2nq1elSu0haMtGBA9mvLLmWAXl_goO4LoIcAat_0VHm7F0XksObL5hJSuYHVVy3UNlaW4","expirationTime":null,"keys":{"p256dh":"BDf3Cr9DkPIjEuz2aIc9n74p9182kDsA0o-HR_obe_Atbib-3R2AGOQQfN1Ap3vFJSQMc8qNvUV0ItRZo8J9OoE","auth":"ftlHhhnnrnPS6J3TB7aZ2A"}};

webpush.sendNotification(pushSubscription, 'Your Push Payload Text');