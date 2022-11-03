// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9ka3GbZ8cRCfq36zPhQz2_wtv1o7q_E0",
    authDomain: "tarea-web1.firebaseapp.com",
    projectId: "tarea-web1",
    storageBucket: "tarea-web1.appspot.com",
    messagingSenderId: "785282195053",
    appId: "1:785282195053:web:95f083338bda6d04ff6964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }