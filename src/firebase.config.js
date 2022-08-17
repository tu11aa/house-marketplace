// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvfdZsaYGalz_7TviIt_TRkaPXeBsqqUA",
  authDomain: "house-marketplace-app-f2427.firebaseapp.com",
  projectId: "house-marketplace-app-f2427",
  storageBucket: "house-marketplace-app-f2427.appspot.com",
  messagingSenderId: "1044107876362",
  appId: "1:1044107876362:web:828eb4af2e34a8d1ffa7f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
