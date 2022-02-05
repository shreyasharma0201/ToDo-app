import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCs_GfMMX-GpI0TvmdwBadDke2Kmv9qv5I",
  authDomain: "to-do-app-8ea26.firebaseapp.com",
  projectId: "to-do-app-8ea26",
  databaseURL: "https://to-do-app-8ea26.firebaseio.com",
  storageBucket: "to-do-app-8ea26.appspot.com",
  messagingSenderId: "994019526629",
  appId: "1:994019526629:web:0cf872c2344f8540b7510c",
  measurementId: "G-68PDMQ7L2J"
});

const db = firebaseApp.firestore();

export default db;












