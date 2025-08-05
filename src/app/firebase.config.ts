// src/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCTjBrzDSlivdA5Uj_4y3bEEAvsyh__bg",
  authDomain: "boda-cristina-jorge.firebaseapp.com",
  databaseURL: "https://boda-cristina-jorge-default-rtdb.firebaseio.com",
  projectId: "boda-cristina-jorge",
  storageBucket: "boda-cristina-jorge.firebasestorage.app",
  messagingSenderId: "862599317571",
  appId: "1:862599317571:web:a587a3851ef1a85e9aecf6"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = getFirestore(app);
