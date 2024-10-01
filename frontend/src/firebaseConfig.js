import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBj1-PFBRGyyAYA9jUyyveVztT7kYtd57Y",
  authDomain: "your_firebase_auth_domain",
  projectId: "empel-1",
  storageBucket: "your_firebase_storage_bucket",
  messagingSenderId: "32396855029",
  appId: "1:323968550299:web:99c02c4d0fe81ecc114d3e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
