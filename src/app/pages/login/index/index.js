import lodash from 'lodash';
import store from './../../../store';
import config from '../../../config.js';
import authService from './../../../services/auth';
const firebase = require('firebase');

export default {
    data() {
        return {
            window: window,
            user: {
                email: null,
                password: null,
            },
            buttonStyles: [
                {backgroundColor: "#6F83BA", color: "#FFFFFF", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"}, //indigo
                {backgroundColor: "#BBDEFB", color: "#FFFFFF", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"}, //baby blue
                {backgroundColor: "#FFD54F", color: "#FFFFFF", textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"}, //amber
            ]
        };
    },
    created(){
        if (!config.DEVELOPMENT) {
            chrome.identity.getProfileUserInfo(function(response){
                if (response.id){
                    store.dispatch('login', response.id);
                    authService.handleTransition(response);
                }
            });
        }
    },
    methods: {
        login(user) {
            authService.login(user);
        },

        random(min, max){
            return _.random(min, max);
        }
    },

    components: {
        VLayout: require('layouts/default/default.vue'),
        VPanel: require('components/panel/panel.vue'),
    },
};
