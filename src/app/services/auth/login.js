/* eslint-disable */
import Vue from 'vue';
import accountService from './../account';
import store from './../../store';
const firebase = require('firebase');
const shortid = require('shortid');

const success = () => {
  Vue.router.push({
    name: 'home.index',
  });
};


export default (user) => {
    let  interactive = true;
    success();
    // chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    //   if (chrome.runtime.lastError && !interactive) {
    //     console.log('It was not possible to get a token programmatically.');
    //   } else if(chrome.runtime.lastError) {
    //     console.error(chrome.runtime.lastError);
    //   } else if (token) {
    //     // Authrorize Firebase with the OAuth Access Token.
    //     var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    //     firebase.auth().signInWithCredential(credential).catch(function(error) {
    //       // The OAuth token might have been invalidated. Lets' remove it from cache.
    //       if (error.code === 'auth/invalid-credential') {
    //         chrome.identity.removeCachedAuthToken({token: token}, function() {
    //           startAuth(interactive);
    //         });
    //       }
    //     });
    //   } else {
    //     console.error('The OAuth Token was null');
    //   }
    // });
};
