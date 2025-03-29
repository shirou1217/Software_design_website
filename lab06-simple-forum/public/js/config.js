// Initialize Firebase
// TODO 1: Change to your firebase configuration
//     Steps:
//     1. Create new Firebase project
//     2. Copy and paste firebase config below
//     Important: Make sure there is databaseURL in the config.
//     Note: If there is no databaseURL in the config,
//           go to firebase console -> Realtime Database to find the databaseURL.
var config = {
  apiKey: "AIzaSyBfC_hNlwhBm-CXvoijXnZWfvBwJdqwXPg",
  authDomain: "softwaredesidn.firebaseapp.com",
  databaseURL: "https://softwaredesidn-default-rtdb.firebaseio.com",
  projectId: "softwaredesidn",
  storageBucket: "softwaredesidn.appspot.com",
  messagingSenderId: "157387608189",
  appId: "1:157387608189:web:b9db36689bb63ca8f16114",
  measurementId: "G-6795Q6ZN8F"

};
firebase.initializeApp(config);