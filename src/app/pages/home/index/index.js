/* ============
 * Home Index Page
 * ============
 *
 * The home index page
 */
import authService from 'src/app/services/auth';
let firebase = require('firebase');
let app = firebase.initializeApp({apiKey: "AIzaSyD2-KL9ohgtMUZQi27QyoswmuWNsEA-t9Q",
    authDomain: "busy-d727c.firebaseapp.com",
    databaseURL: "https://busy-d727c.firebaseio.com",
    storageBucket: "busy-d727c.appspot.com",
    messagingSenderId: "555996787874"
});

export default {
  components: {
    VLayout: require('layouts/default/default.vue'),
    VPanel: require('components/panel/panel.vue'),
  },
  methods:{
      
  }
};
