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
  data() {
      return {
        newDailyTodo: "",
        newWeeklyTodo: "",
        dailyId: 0,
        weeklyId: 0,
        dailyList: [],
        weeklyList: []
      }
  },
  components: {
    VLayout: require('layouts/default/default.vue'),
    VPanel: require('components/panel/panel.vue'),
  },
  methods:{
      addDailyTodo(){
          let id = this.dailyId;
          this.dailyList.push({ uid : id, item: this.newDailyTodo});
          this.dailyId++;
      },
      addWeeklyTodo(){
          let id = this.weeklyId;
          this.weeklyList.push({uid : id, item: this.newWeeklyTodo});
          this.weeklyId++;
      }
  }
};
