// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrrc8ejqrAC_AwC9TTBzUjYFS8JptZ2qY",
  authDomain: "trip-planer-9466c.firebaseapp.com",
  projectId: "trip-planer-9466c",
  storageBucket: "trip-planer-9466c.firebasestorage.app",
  messagingSenderId: "693596364060",
  appId: "1:693596364060:web:cd39c366bb644697f12ed9",
  measurementId: "G-B6CZKQ38GM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
