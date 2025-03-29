import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1NkIAasI3UIl4k_wlIasr03cNFSozbMk",
  authDomain: "chatroom-110081014.firebaseapp.com",
  projectId: "chatroom-110081014",
  storageBucket: "chatroom-110081014.appspot.com",
  messagingSenderId: "1070451919175",
  appId: "1:1070451919175:web:c0f1742fa3b56c252da462"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
