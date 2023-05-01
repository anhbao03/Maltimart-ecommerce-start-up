// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDzHIdlrSRSTJONvIZoMcrkgge04HkzbmA",
  authDomain: "maltimart-d3565.firebaseapp.com",
  projectId: "maltimart-d3565",
  storageBucket: "maltimart-d3565.appspot.com",
  messagingSenderId: "450837884373",
  appId: "1:450837884373:web:2da537ec55035662f2215c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app