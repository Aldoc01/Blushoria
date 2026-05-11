// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABLuiEyrf8BvuC2hjwimhoqHYnK8ZxKRs",
  authDomain: "blushoriastore.firebaseapp.com",
  databaseURL: "https://blushoriastore-default-rtdb.firebaseio.com",
  projectId: "blushoriastore",
  storageBucket: "blushoriastore.firebasestorage.app",
  messagingSenderId: "574652420119",
  appId: "1:574652420119:web:3157682a34e9e942a40c52",
  measurementId: "G-38Q74Q5SXN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database
const db = firebase.firestore();
