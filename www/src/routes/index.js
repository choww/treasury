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
]

export default new Router({ routes });
