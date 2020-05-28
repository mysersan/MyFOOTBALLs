    var webPush = require('web-push');
     
    const vapidKeys = {
       "publicKey": "BDCy4G-uE9pP4EhnoauuJiUeMC85UqEJwlrh-S73SEitM7akW_1k6xJ4HGqnlwAsmb5M-T8HciGJqBZVEn70u40",
       "privateKey": "bXP1Btws1l__-b7THTtdV1kM2tAE-eTbnSik0w6mC3g"
    };
     
     
    webPush.setVapidDetails(
       'mailto:example@yourdomain.org',
       vapidKeys.publicKey,
       vapidKeys.privateKey
    )
    var pushSubscription = {
       "endpoint": "https://fcm.googleapis.com/fcm/send/eVoKXQc6fQQ:APA91bGU5Gqzv-82EvAOcR589D-EQ1wtLgv_8oIHVpjd1sLsPGZUT_jRPXjFveRVb5bKHd5KH4CsXmqucHBnqkSZc8Aj7tqSRhT4rWSfvz_JTXyV5RD5taH791EDmiMz0fx-a7CNSUPL",
       "keys": {
           "p256dh": "BCLmLJiyZfS8Hxzpx1f1czseUhq4KCOgqeIhY8YKayFcMXjMrGX7lJ4q4hG3VUwjWN75qWpCv4zROQu+8nMzZs8=",
           "auth": "B53w9qTEIXgKtE03qflzfQ===="
       }
    };
    var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
     
    var options = {
       gcmAPIKey: '1073296609565',
       TTL: 60
    };
    webPush.sendNotification(
       pushSubscription,
       payload,
       options
    );