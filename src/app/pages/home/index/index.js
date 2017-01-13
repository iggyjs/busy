import draggable from 'vuedraggable';
import lodash from 'lodash';
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
        maxDaily: 9,
        maxWeekly: 9,
        dailyId: 1,
        weeklyId: 1,
        currentUserId: null,
        newDailyTodo: "",
        newWeeklyTodo: "",
        dailyList: [],
        weeklyList: [],
        dailyListCompleted : [],
        weeklyListCompleted : [],
        bannerStyles: [
            {backgroundColor: "#6F83BA"}, //indigo
            {backgroundColor: "#BBDEFB"}, //baby blue
            {backgroundColor: "#D14E5D"}, //red
            {backgroundColor: "#FFD54F"}, //amber
        ]
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
               vueInstance.dailyId = snapshot.val().dailyList.list.length;
               if (snapshot.val().dailyList.completed)
                vueInstance.dailyListCompleted = snapshot.val().dailyList.completed.completedList;

               // set weekly lists
               vueInstance.weeklyList = snapshot.val().weeklyList.list;
               vueInstance.weeklyId = snapshot.val().weeklyList.list.length;
               if (snapshot.val().weeklyList.completed)
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
          if (this.dailyId < this.maxDaily) {
              let val = this.newDailyTodo && this.newDailyTodo.trim()
              if (!val) {
                return;
              }

              let id = this.dailyId;
              this.dailyList.push({ item: this.newDailyTodo });
              this.newDailyTodo = "";
              this.dailyId++;
              this.saveDailyItems();
          } else {
            //Show toastr
          }
      },

      addWeeklyTodo(){
          if (this.weeklyId < this.maxWeekly) {
              let val = this.newWeeklyTodo && this.newWeeklyTodo.trim()
              if (!val) {
                return;
              }

              let id = this.weeklyId;
              this.weeklyList.push({item: this.newWeeklyTodo});
              this.newWeeklyTodo = "";
              this.weeklyId++;
              this.saveWeeklyItems();
         } else {
            //Show toastr

         }
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
      },

      clearCompleted(list) {
          if (!list){
            //0: Daily
            this.dailyListCompleted = [];
            this.saveDailyItems();
          } else {
            //1: Weekly
            this.weeklyListCompleted = [];
            this.saveWeeklyItems();
          }
      },

      random(min, max){
          return _.random(min, max);
      }

  }
};
