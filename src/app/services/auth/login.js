/* eslint-disable */
import Vue from 'vue';
import accountService from './../account';
import store from './../../store';
let firebase = require('firebase');
let app = firebase.initializeApp({apiKey: "AIzaSyD2-KL9ohgtMUZQi27QyoswmuWNsEA-t9Q",
    authDomain: "busy-d727c.firebaseapp.com",
    databaseURL: "https://busy-d727c.firebaseio.com",
    storageBucket: "busy-d727c.appspot.com",
    messagingSenderId: "555996787874"});

// When the request succeeds
const success = (token) => {
  store.dispatch('login', token);
  accountService.find();
  Vue.router.push({
    name: 'home.index',
  });
};

// When the request fails
const failed = () => {
};

export default (user) => {
  /*
   * Normally you would perform an AJAX-request.
   * But to get the example working, the data is hardcoded.
   *
   * With the include REST-client Axios, you can do something like this:
   * Vue.$http.post('/auth/login', user)
   *   .then((response) => {
   *     success(response);
   *   })
   *   .catch((error) => {
   *     failed(error);
   *   });
   */
  // if (!user.email || !user.password) {
  //   failed();
  // } else {
  //   success('RandomGeneratedToken');
  // }
  // var provider = new firebase.auth.GoogleAuthProvider();

  firebase.database().ref('users/').set({
    username: "Iggy",
    email: "Ig"
  });

  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   console.log(user);
  //   // ...
  //   }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
};
