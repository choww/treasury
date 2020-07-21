import Vue from 'vue';
import Router from 'vue-router';

import Landing from '@/components/Landing'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      protected: true, 
    },
  },
]

export default new Router({ 
  base: process.env.BASE_URL,
  routes 
});
