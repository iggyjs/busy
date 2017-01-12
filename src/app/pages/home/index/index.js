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
        currentUserId: null,
        newDailyTodo: "",
        newWeeklyTodo: "",
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
          this.dailyList.push({ item: this.newDailyTodo});
          this.newDailyTodo = "";
          this.dailyId++;
          this.saveDailyItems()
      },

      addWeeklyTodo(){
          let id = this.weeklyId;
          this.weeklyList.push({item: this.newWeeklyTodo});
          this.newWeeklyTodo = "";
          this.weeklyId++;
          this.saveWeeklyItems()
      },

      deleteDailyItem(item){
          let index = this.dailyList.indexOf(item);
          if (index > -1) {
            this.dailyList.splice(index,1);
            this.saveDailyItems()
          }
      },

      deleteWeeklyItem(item){
          let index = this.weeklyList.indexOf(item);
          if (index > -1){
            this.weeklyList.splice(index,1);
            this.saveWeeklyItems();
          }
      },

      saveDailyItems(){
          let id = firebase.auth().currentUser.uid;
          let list = this.dailyList;

          if (this.currentUserId == null){
              this.currentUserId = id;
          }

          //save current daily list
          firebase.database().ref('users/' + id + '/dailyList/').set({list}).then(() => {
              console.log("daily list saved");
          });
      },

      saveWeeklyItems(){
          let id = firebase.auth().currentUser.uid;
          let list = this.weeklyList;

          if (this.currentUserId == null){
              this.currentUserId = id;
          }

          //save current weekly list
          firebase.database().ref('users/' + id + '/weeklyList/').set({list}).then(() =>{
              console.log("Weekly list saved");
          });
      }

  }
};
