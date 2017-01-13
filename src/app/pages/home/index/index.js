// TODO: Error handle empty submissions, quickly implement max items for list
// FIXME: On user create handle creation of completed lists to avoid undefined errors

import draggable from 'vuedraggable';
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
        user: {},
        currentUserId: null,
        newDailyTodo: "",
        newWeeklyTodo: "",
        dailyList: [],
        weeklyList: [],
        dailyListCompleted : [],
        weeklyListCompleted : []
      }
  },

  mounted(){
    const vueInstance = this;
    let c = function() {
        let u = firebase.auth().currentUser;
        if (u != null) {
           let id = u.uid;
           firebase.database().ref('users/' + id).once('value').then((snapshot) => {
               vueInstance.user = snapshot.val();
               // set daily lists
               vueInstance.dailyList = snapshot.val().dailyList.list;
               vueInstance.dailyListCompleted = snapshot.val().dailyList.completed.completedList;

               // set weekly lists
               vueInstance.weeklyList = snapshot.val().weeklyList.list;
               vueInstance.weeklyListCompleted = snapshot.val().weeklyList.completed.completedList;

           });
           return;
        }
    }
    setTimeout(c, 1000);
  },

  components: {
    draggable,
    VLayout: require('layouts/default/default.vue'),
    VPanel: require('components/panel/panel.vue'),
  },

  methods:{
      addDailyTodo(){
          let id = this.dailyId;
          this.dailyList.push({ item: this.newDailyTodo });
          this.newDailyTodo = "";
          this.dailyId++;
          this.saveDailyItems();
      },

      addWeeklyTodo(){
          let id = this.weeklyId;
          this.weeklyList.push({item: this.newWeeklyTodo});
          this.newWeeklyTodo = "";
          this.weeklyId++;
          this.saveWeeklyItems()
      },

      markDailyItemCompleted(item){
          let index = this.dailyList.indexOf(item);
          if (index > -1) {
            this.dailyList.splice(index,1);
          }
          this.dailyListCompleted.push(item)
          this.saveDailyItems();
      },

      markWeeklyItemCompleted(item){

          let index = this.weeklyList.indexOf(item);
          if (index > -1){
            this.weeklyList.splice(index,1);
          }
          this.weeklyListCompleted.push(item)
          this.saveWeeklyItems();
      },

      saveDailyItems(){
          let id = firebase.auth().currentUser.uid;
          let list = this.dailyList;
          let completedList = this.dailyListCompleted;

          if (this.currentUserId == null){
              this.currentUserId = id;
          }

          //save current daily list
          firebase.database().ref('users/' + id + '/dailyList/').set({list}).then(() => {
              console.log("Daily list saved");
              // save currently daily completed list
              firebase.database().ref('users/' + id + '/dailyList/completed/').set({completedList}).then(() =>{
                  console.log("Daily completed list saved");
              });
          });
      },

      saveWeeklyItems(){
          let id = firebase.auth().currentUser.uid;
          let list = this.weeklyList;
          let completedList = this.weeklyListCompleted;

          if (this.currentUserId == null){
              this.currentUserId = id;
          }

          //save current weekly list
          firebase.database().ref('users/' + id + '/weeklyList/').set({list}).then(() =>{
              console.log("Weekly list saved");
              // save currently weekly completed list
              firebase.database().ref('users/' + id + '/weeklyList/completed/').set({completedList}).then(() =>{
                  console.log("Weekly completed list saved");
              });
          });
      }
  }
};
