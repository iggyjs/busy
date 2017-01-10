/* eslint-disable */
import Vue from 'vue';
import accountService from './../account';
import store from './../../store';
const firebase = require('firebase');

const success = (token) => {
  store.dispatch('login', token);
  accountService.find();
  Vue.router.push({
    name: 'home.index',
  });
};


export default (user) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    success('RandomGeneratedToken');

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
};
