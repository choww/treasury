import { axiosConfigs } from '@/helpers';

export default {  
  namespaced: true, 
  state: {
    categories: [],
  },
  getters: {
    categories: state => {
      return state.categories.map(category => category.name);
    },
  },
  mutations: {
    categories(state, data) {
      state.categories = data;
    },
  },
  actions: {
    getCategories: async ({ commit }) => {
      const axios = axiosConfigs();
      const { data } = await axios.get(`${process.env.API_URL}/categories`);
      commit('categories', data.categories);
    },
  },
};
