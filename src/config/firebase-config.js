// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk2MzS7kzt4GAOemtgmrATGF9cKVWC99w",
  authDomain: "expense-tracker-ec8eb.firebaseapp.com",
  projectId: "expense-tracker-ec8eb",
  storageBucket: "expense-tracker-ec8eb.appspot.com",
  messagingSenderId: "284522464861",
  appId: "1:284522464861:web:8d6bf381a989a99cb16fb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
