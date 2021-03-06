import axios from 'axios';
import { axiosConfigs, getJWT } from '@/helpers';

export default {
  namespaced: true,
  state: {
    me: null,
  },
  mutations: {
    me(state, data) {
      state.me = data;
    },
    jwt(state, token) {
      state.jwt = token;
    },
  },
  actions: {
    login: async ({ commit }, { email, password }) => {
      try {
        const { data } = await axios({
          url: `${process.env.API_URL}/auth/login`,
          method: 'POST',
          auth: {
            username: email,
            password,
          },
        })

        if (!data.token) return

        localStorage.setItem(process.env.JWT, data.token);
        delete data.user.password;
        localStorage.setItem(process.env.USER, JSON.stringify(data.user));

        commit('me', data.user);
      } catch (error) {
        console.log('Invalid credentials');
      }
    },

    getCurrentUser: async ({ commit }) => {
      const getUser = localStorage.getItem(process.env.USER);
      if (getUser) {
        commit('me', JSON.parse(getUser));
        return;
      }

      const jwt = getJWT();
      if (!jwt) return;

      const axiosModule = axiosConfigs();
      const data = await axiosModule.get(`${process.env.API_URL}/users/me`);
      commit('me', data.data);

      return data;
    },

    createUser: async({ commit, dispatch }, { firstName, lastName, email, password, monthlyIncome }) => {
      try {
        const { data } = await axios({
          url: `${process.env.API_URL}/signup`,
          method: 'POST',
          data: {
            firstName,
            lastName,
            email,
            password,
            monthlyIncome,
          },
        });

        if (data.user) {
          await dispatch('login', { email, password });
        }

      } catch (error) {
        console.log('Something went wrong', error);
      }
    },

    logout: async ({ commit }) => {
      const data = await axios(`${process.env.API_URL}/auth/logout`);

      localStorage.removeItem(process.env.JWT);
      localStorage.removeItem(process.env.USER);
      commit('me', null);

      return data;
    },
  }

};
