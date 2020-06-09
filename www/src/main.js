import Vue from 'vue';
import App from './App';
import router from './routes';

Vue.config.proudctionTip = false;

new Vue({
  el: '#app',
  router, 
  components: { App },
  template: '<App/>',
});
