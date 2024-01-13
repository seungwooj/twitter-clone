// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR6gbzXjBP3AguuYQv5CtR_oYGgP_Cilk",
  authDomain: "twitter-clone-68df1.firebaseapp.com",
  projectId: "twitter-clone-68df1",
  storageBucket: "twitter-clone-68df1.appspot.com",
  messagingSenderId: "146128631446",
  appId: "1:146128631446:web:a85f77eaf69fe93c6c34b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Autnehtication (https://firebase.google.com/docs/auth/web/custom-auth)
export const auth = getAuth(app);

// Storage
export const storage = getStorage(app);

// Database
export const db = getFirestore(app);
