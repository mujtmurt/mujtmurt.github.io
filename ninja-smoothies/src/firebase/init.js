import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBvZ1Ju-CepQv2rzrQHED5CEREHQdHDx-s",
  authDomain: "ninja-smoothies-application.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-application.firebaseio.com",
  projectId: "ninja-smoothies-application",
  storageBucket: "ninja-smoothies-application.appspot.com",
  messagingSenderId: "671004925972",
  appId: "1:671004925972:web:6b032d3fd10ba3c1874701",
  measurementId: "G-MD0K0HVE98"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the firestore database
export default firebaseApp.firestore();
