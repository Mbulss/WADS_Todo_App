//firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgeRWG0zareXUiN7BymmP2lwA6DHlmKcg",
  authDomain: "todo-app-d98a6.firebaseapp.com",
  projectId: "todo-app-d98a6",
  storageBucket: "todo-app-d98a6.firebasestorage.app",
  messagingSenderId: "771925229777",
  appId: "1:771925229777:web:e59bce729d5992f5ea85f0",
  measurementId: "G-14KGBSN1J1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 