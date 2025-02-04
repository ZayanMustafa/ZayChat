// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
const analytics = getAnalytics(app);

// Get references to Firebase services
const auth = getAuth();
const db = getDatabase();

// Function to create a user with email and password
const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log("User created:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    });
};

// Function to sign in with email and password
const signInWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log("Signed in as:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
    });
};

// Function to sign in with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in with Google:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error with Google sign-in:", errorCode, errorMessage);
    });
};

// Function to save a message to Firebase Realtime Database
const saveMessage = (message, userId) => {
  const messagesRef = ref(db, 'messages/' + userId);
  set(messagesRef, {
    message: message,
    timestamp: Date.now()
  })
  .then(() => {
    console.log("Message saved!");
  })
  .catch((error) => {
    console.error("Error saving message:", error);
  });
};
