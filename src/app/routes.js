// Routes
export default [
  // Home
  {
    path: '/home',
    name: 'home.index',
    component: require('pages/home/index/index.vue'),

    // If the user needs to be authenticated to view this page
    //meta: {
      //auth: true,
    //},
  },

  // About
  {
    path: '/about',
    name: 'about.index',
    component: require('pages/about/index/index.vue'),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: require('pages/login/index/index.vue'),

    // If the user needs to be a guest to view this page
    meta: {
      guest: true,
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/*',
    redirect: '/home',
  },
];
