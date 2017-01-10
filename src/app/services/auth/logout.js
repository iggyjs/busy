/* eslint-disable */
import Vue from 'vue';
import store from './../../store';

const firebase = require('firebase');

export default () => {
  firebase.auth().signOut().then(function() {
    store.dispatch('logout');
    Vue.router.push({
      name: 'login.index',
    });
  });
};
