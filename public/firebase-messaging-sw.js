importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyADE-ZTVHVrJop0qZM_AjMWnuFLjMti-0c",
    authDomain: "nsnoais.firebaseapp.com",
    projectId: "nsnoais",
    storageBucket: "nsnoais.appspot.com",
    messagingSenderId: "793241046619",
    appId: "1:793241046619:web:9fb47d04fa6c001e6d797e"
  };

  const app = firebase.initializeApp(firebaseConfig);
let messaging = null;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {});
}
