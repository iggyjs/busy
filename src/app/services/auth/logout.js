/* eslint-disable */
import Vue from 'vue';
import store from './../../store';

const firebase = require('firebase');

export default () => {
    localStorage.removeItem('userId');
    store.dispatch('logout');
    Vue.router.push({
      name: 'login.index',
    });
};
