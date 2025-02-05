// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAx374l1uIJ9kN00A63yImK_zzwUfNMo8",
  authDomain: "chatappbyzayyan.firebaseapp.com",
  projectId: "chatappbyzayyan",
  storageBucket: "chatappbyzayyan.firebasestorage.app",
  messagingSenderId: "357803733196",
  appId: "1:357803733196:web:6858719c90e0adee6c1269",
  measurementId: "G-M98CL9L9PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get authentication and Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Fixed: Use 'googleProvider' instead of 'GoogleAuthProvider'

// Initialize Firebase Realtime Database
const db = getDatabase(app);

// Export the necessary objects for use in other files
export { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, db, ref, set };
