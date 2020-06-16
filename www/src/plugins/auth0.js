import Vue from 'vue';
import Auth0Client from '@auth0/auth0-spa-js';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

let instance;

/** Returns the current instance of the SDK */
// export const getInstance = () => instance;

/** 
 * Creates an instance of the Auth0 SDK. 
 * Will return the instance if it's already created
 */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    // init client
    async created() {
      this.auth0Client = await Auth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri,
      });

      try {
        const { search } = window.location
        // if user is return to app after authentication
        if (search.includes('code=') && search.includes('state=')) {
          // handle the redirect & retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();
          onRedirectCallback(appState);
        }
      } catch (err) {
        this.error = err;
      } finally {
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    },
    methods: {
      // async loginWithPopup(options) {
      //   this.popupOpen = true;

      //   try {
      //     await this.auth0Client.loginWithPopup(options);
      //   } catch (err) {
      //     // eslint-disable-next-line
      //     console.error(err);
      //   } finally {
      //     this.popupOpen = false;
      //   }

      //   this.user = await this.auth0Client.getUser();
      //   this.isAuthenticated = true;
      // },

      async handleCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        } catch (err) {
          this.error = err;
        } finally {
          this.loading = false;
        }
      },
      // authenticate user 
      login(options) {
        console.log(options);
        return this.auth0Client.loginWithRedirect(options);
      },

      getIdToken(options) {
        return this.auth0Client.getIdTokenClaims(options);
      },
      // if access token is missing/invalid, retrieve new one
      getAccessToken(options) {
        return this.auth0Client.getTokenSilently(options);
      },

      getAccessTokenWithPopup(options) {
        return this.auth0Client.getTokenWithPopup(options);
      },

      logout(options) {
        return this.auth0Client.logout(options);
      },
    },
  });

  return instance;
}

export const Auth0Plugin = {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  }
};
