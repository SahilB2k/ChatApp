// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo7LC6Z3rvbop6swfva1RNYV6WFkQy92U",
  authDomain: "chatapp-25bf2.firebaseapp.com",
  projectId: "chatapp-25bf2",
  storageBucket: "chatapp-25bf2.firebasestorage.app",
  messagingSenderId: "802870015087",
  appId: "1:802870015087:web:0652a95f036cc68f59499a",
  measurementId: "G-SW5GVLMN1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);