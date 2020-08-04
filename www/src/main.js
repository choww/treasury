import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import App from './App';
import router from './routes';
import store from './store';

Vue.config.proudctionTip = false;

Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        success: '#7CB342',
      },
      dark: {
        // primary: '',
        // secondary: '',
        // accent: '',
        error: '#FF5252',
        // info: '',
        success: '#7CB342',
        warning: '#FFB300',
      },
    },
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.protected)) {
    if (localStorage.getItem(process.env.JWT)) {
      next();
    } else {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      });
    }
  }

  next();
});

new Vue({
  el: '#app',
  router, 
  store, 
  vuetify,
  components: { App },
  template: '<App/>',
});
