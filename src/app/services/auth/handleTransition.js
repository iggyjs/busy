/* eslint-disable */
import Vue from 'vue';
import store from './../../store';
const firebase = require('firebase');

const success = () => {
  Vue.router.push({
    name: 'home.index',
  });
};

// When the request fails
const failed = () => {
};

export default (user) => {

    let checkUser = firebase.database().ref('/users/' + user.id).once('value').then(function(snapshot) {
         if (snapshot.val() != null) { //returning user
             success();
         } else { //new user
             firebase.database().ref('users/' + user.id).set({
                 email: user.email,
                 // TODO: Add assumed fields here
             }).then(function(){
                 success();
             });
         }
     }).catch(function(error) {
       // Handle Errors here.
       console.log(error);
     });
};
