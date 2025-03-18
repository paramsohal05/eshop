// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVkfsoos8FdbA0JMld_M8YE45UvA_ugFk",
  authDomain: "onlineshop-5482c.firebaseapp.com",
  projectId: "onlineshop-5482c",
  storageBucket: "onlineshop-5482c.firebasestorage.app",
  messagingSenderId: "804648958867",
  appId: "1:804648958867:web:e2213288d922cb50580666"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore();
export const storage=getStorage()
