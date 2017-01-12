/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login
 */

import authService from './../../../services/auth';

export default {

  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  created: function(){

  },
  methods: {
    login(user) {
      authService.login(user);
    },
  },

  components: {
    VLayout: require('layouts/default/default.vue'),
    VPanel: require('components/panel/panel.vue'),
  },
};
