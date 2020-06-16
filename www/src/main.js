import Vue from 'vue';
import dotenv from 'dotenv';
import App from './App';
import router from './routes';
import { Auth0Plugin } from './plugins/auth0';

dotenv.config();

const { AUTH0_CLIENT_ID, AUTH0_DOMAIN } = process.env;
Vue.use(Auth0Plugin, {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  onRedirectCallback: state => {
    router.push(
      state && state.targetUrl 
      ? state.targetUrl
      : window.location.pathname
    );
  },
});

Vue.config.proudctionTip = false;

new Vue({
  el: '#app',
  router, 
  components: { App },
  template: '<App/>',
});
