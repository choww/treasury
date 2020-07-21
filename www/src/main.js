import Vue from 'vue';
import App from './App';
import router from './routes';
import store from './store';

Vue.config.proudctionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected)) {
    if (localStorage.getItem(process.env.JWT)) next();

    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    });
  }

  next();
});

new Vue({
  el: '#app',
  router, 
  store, 
  components: { App },
  template: '<App/>',
});
