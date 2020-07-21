import Vue from 'vue';
import Vuex from 'vuex';
import users from './users';
import authenticate from './authenticate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authenticate, 
    users,
  }
});

