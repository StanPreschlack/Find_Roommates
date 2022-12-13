// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

// look into google messaging sdk

// https://firebase.google.com/docs/cloud-messaging/js/client

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8dU0c7j7ljfNLhTvTkJMTylPvvGpMSls",
  authDomain: "nyu-find-roommates.firebaseapp.com",
  projectId: "nyu-find-roommates",
  storageBucket: "nyu-find-roommates.appspot.com",
  messagingSenderId: "242842366924",
  appId: "1:242842366924:web:a37e722f595dedad61a369",
  measurementId: "G-R2599K2WJJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
