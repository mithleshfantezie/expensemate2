import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyA_NJpUsLgxGOvFue2XGj9Ltxhvf3CNHQY",
    authDomain: "expensemate2.firebaseapp.com",
    databaseURL: "https://expensemate2.firebaseio.com",
    projectId: "expensemate2",
    storageBucket: "",
    messagingSenderId: "292765463259"
  };
  firebase.initializeApp(config);



  export default firebase;
