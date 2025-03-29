import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfC_hNlwhBm-CXvoijXnZWfvBwJdqwXPg",
  authDomain: "softwaredesidn.firebaseapp.com",
  databaseURL: "https://softwaredesidn-default-rtdb.firebaseio.com",
  projectId: "softwaredesidn",
  storageBucket: "softwaredesidn.appspot.com",
  messagingSenderId: "157387608189",
  appId: "1:157387608189:web:b57935d7411398a3f16114",
  measurementId: "G-86B3M1QKX4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
