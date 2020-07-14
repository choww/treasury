import axios from 'axios';

export default {
  namespaced: true, 
  state: {
    user: {}, 
    jwt: null,
    isAuthenticated: false, 
  },
  mutations: {
    isAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    jwt(state, token) {
      state.jwt = token;
    },
  },
  actions: {
    login: async ({ commit }, { email, password }) => {
      const { data: token } = await axios({
        url: `${process.env.API_URL}/auth/login`,
        method: 'POST',
        auth: {
          username: email,
          password, 
        },
      })
   
      if (!token) return

      commit('jwt', token) 
      commit('isAuthenticated', true);
    },
  },
};
