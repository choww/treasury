import Vue from 'vue';
import dotenv from 'dotenv';
import App from './App';
import router from './routes';

dotenv.config();

Vue.config.proudctionTip = false;

new Vue({
  el: '#app',
  router, 
  components: { App },
  template: '<App/>',
});
