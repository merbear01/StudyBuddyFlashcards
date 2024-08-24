import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsuINJLpezkLrO72ul2waIsHMrI1-Vnhc",
    authDomain: "flashcards-saas-f70c4.firebaseapp.com",
    projectId: "flashcards-saas-f70c4",
    storageBucket: "flashcards-saas-f70c4.appspot.com",
    messagingSenderId: "840872481513",
    appId: "1:840872481513:web:4ab83cc5b93ad27ee89678",
    measurementId: "G-Q5QB8JDFPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
    // Check if analytics is supported
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

const db = getFirestore(app);

export { db, analytics };
