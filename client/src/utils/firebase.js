// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "intern-task-manager.firebaseapp.com",
  projectId: "intern-task-manager",
  storageBucket: "intern-task-manager.appspot.com",
  messagingSenderId: "128434834056",
  appId: "1:128434834056:web:de706ddc7c8824e3d32d3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);