import Vue from 'vue';
import dotenv from 'dotenv';
import App from './App';
import router from './routes';
import store from './store';

dotenv.config();

Vue.config.proudctionTip = false;

new Vue({
  el: '#app',
  router, 
  store, 
  components: { App },
  template: '<App/>',
});
