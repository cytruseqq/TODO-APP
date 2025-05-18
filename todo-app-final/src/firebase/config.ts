// firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbgfFnlIJFuIqF13anfvcSiddsxjiMg6s",
  authDomain: "apka-projekt.firebaseapp.com",
  projectId: "apka-projekt",
  storageBucket: "apka-projekt.firebasestorage.app",
  messagingSenderId: "724218181191",
  appId: "1:724218181191:web:8f2a710c40f08722882362",
  measurementId: "G-ESX1W1WN6Q"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
