import firebase from '../services/firebase';
import {
        USER_INFO,
        FETCH_RECORDS } from './type.js';


export const startLogin = () => {
const provider =  new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider);
}


const getUserInfo = (user) => {
  return {
    type: USER_INFO,
    user
  }
}


export const getUser = () => {
  const user = {};
  return dispatch  => {
    firebase.auth().onAuthStateChanged(function(foundUser) {
  if (foundUser) {
    user.id = foundUser.uid;
    user.image = foundUser.photoURL;
    user.name = foundUser.displayName;
    }
    dispatch(getUserInfo(user));
});
}
}

export const logout = () => {
  firebase.auth().signOut();
}

const fetchRecordsSuccess = (records) => {
  return {
    type: FETCH_RECORDS,
    records
  }
}


export const fetchRecords = (id,month) => {
  return dispatch => {
      firebase.database().ref(`/expenses/${id}/${month}`).once('value').then(function(snapshot) {
        const records = [];
        snapshot.forEach(function(expense) {
          records.push({id:expense.key,...expense.val()})
        });
  
        dispatch(fetchRecordsSuccess(records));
});
  }
}

export const addExpense = (id,month,value) => {
    firebase.database().ref(`expenses/${id}/${month}`).push(value);
}

export const removeExpense = (id,month,eid) => {
  firebase.database().ref(`expenses/${id}/${month}/${eid}`).remove();
}
