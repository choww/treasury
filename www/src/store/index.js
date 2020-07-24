import Vue from 'vue';
import Vuex from 'vuex';
import authenticate from './authenticate';
import categories from './categories';
import transactions from './transactions';
import users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authenticate, 
    categories,
    transactions,
    users,
  }
});

