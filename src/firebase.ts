import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCKnURsq6si0MM_P6CvKafNDCfQMlgePMw",
    authDomain: "sadaora.firebaseapp.com",
    projectId: "sadaora",
    storageBucket: "sadaora.firebasestorage.app",
    messagingSenderId: "106855286222",
    appId: "1:106855286222:web:93c130155e4afc1f22179f",
    measurementId: "G-MDC9R08FY2"
};

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
export const fireDb = getFirestore(app)

export default app