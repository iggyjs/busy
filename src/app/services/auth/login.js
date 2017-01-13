/* eslint-disable */
import Vue from 'vue';
import accountService from './../account';
import store from './../../store';
const firebase = require('firebase');
const shortid = require('shortid');

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
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;

    let checkUser = firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        if (snapshot.val() != null) { //returning user
            success('RandomGeneratedToken');
        } else { //new user
            firebase.database().ref('users/' + user.uid).set({
                email: user.email,
                photoUrl: user.photoURL,
                name: user.displayName,
                // TODO: Add assumed fields here
            }).then(function(){
                success('RandomGeneratedToken');
            });
        }
    });

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
