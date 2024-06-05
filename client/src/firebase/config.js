// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYgn12ARrgBcqM2V6viOuLwxwTPO28VgU",
  authDomain: "mapp-fc0a9.firebaseapp.com",
  projectId: "mapp-fc0a9",
  storageBucket: "mapp-fc0a9.appspot.com",
  messagingSenderId: "175690366655",
  appId: "1:175690366655:web:b9fa3ff666976f53ae900a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();