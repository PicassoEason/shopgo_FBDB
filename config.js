const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDhxS8c718wJtTyPzSTkupguVo3FP8dT40",
  authDomain: "shgo-64872.firebaseapp.com",
  databaseURL: "https://shgo-64872-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shgo-64872",
  storageBucket: "shgo-64872.appspot.com",
  messagingSenderId: "670166088191",
  appId: "1:670166088191:web:6a45d1600edac635ad0fca",
  measurementId: "G-P5K60Z9ZNC"
};

  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;