// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGPDp_vw7Eq0LFlUPW1vP72q3sbMngFkQ",
  authDomain: "react-contact-app-93a4e.firebaseapp.com",
  projectId: "react-contact-app-93a4e",
  storageBucket: "react-contact-app-93a4e.appspot.com",
  messagingSenderId: "384949387966",
  appId: "1:384949387966:web:5a1c47785af9a4bf8a14ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);