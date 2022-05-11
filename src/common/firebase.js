// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firebase-messaging'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADE-ZTVHVrJop0qZM_AjMWnuFLjMti-0c",
  authDomain: "nsnoais.firebaseapp.com",
  projectId: "nsnoais",
  storageBucket: "nsnoais.appspot.com",
  messagingSenderId: "793241046619",
  appId: "1:793241046619:web:9fb47d04fa6c001e6d797e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let messaging = null
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()
}
export default messaging