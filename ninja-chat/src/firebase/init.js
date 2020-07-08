import firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCH1KM8e4JieegDTr0hZ_LKl0lXKEMKdUA",
  authDomain: "ninja-chat-application.firebaseapp.com",
  databaseURL: "https://ninja-chat-application.firebaseio.com",
  projectId: "ninja-chat-application",
  storageBucket: "ninja-chat-application.appspot.com",
  messagingSenderId: "838731761002",
  appId: "1:838731761002:web:795a7ba1daec9a83991113",
  measurementId: "G-MX51FK8JHY"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
