var webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BIWnrhlLEssn8vFTA6Ld0x2EKQIzcwy9jXRIzmeYg0WnO3EOmAIF2ozkt-rW7NmCIDZtxcA_ZMKqFI8Pb_Oh_hM",
   "privateKey": "VKzR_gklswofZSNgW59TpfN2Zo0QoOGMXyQ7Qxfw5gw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fD-XQnc1VSk:APA91bEaadObqi6zsII_hfWgv5Wsl04jHMRQKOwqztzlAGYxDXgTmhfCgGE0saiKyU7rRl3Cmj-Q-_OluDxQkfA5-gO0hIsDzDUrmD9FDlh2Km5h8ibha-HRicxNBaq5pDo6ig4thSSE",
   "keys": {
       "p256dh": "BNHQ4sMTEbJO3LLQVZ5ixKsTBL/SlTophwMvwfJjuUwSJ0SsJRE3fpKVtTVZHGe+Hs5p95NmYlxk4gZ1Do7Znuk=",
       "auth": "v3lNUwX6ohrShOIw7CsMlw=="
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