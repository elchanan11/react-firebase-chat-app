import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9kQ26L6TapCQKGoqLePM_enz-2c4uvQw",
    authDomain: "message-pigeon.firebaseapp.com",
    databaseURL: "https://message-pigeon-default-rtdb.firebaseio.com",
    projectId: "message-pigeon",
    storageBucket: "message-pigeon.appspot.com",
    messagingSenderId: "381952824349",
    appId: "1:381952824349:web:c65b69d81b013d3610e2f4",
    measurementId: "G-EKJ7J7CVHT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
