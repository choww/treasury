import { axiosConfigs } from '@/helpers';

export default {  
  namespaced: true, 
  state: {
    transactions: [],
  },
  mutations: {
    transactions(state, data) {
      state.transactions = data;
    },
  },
  actions: {
    find: async({ commit }) => {
      const axios = axiosConfigs();
      const { data } = await axios.get(`${process.env.API_URL}/transactions`);
      commit('transactions', data.transactions);
    },

    create: async ({ dispatch }, { isExpense, amount, date, category }) => {
      const axios = axiosConfigs();
      const data = {
        isExpense,
        amount: parseInt(amount),
        date,
        // category,
      };
      try {
        await axios({
          url: `${process.env.API_URL}/transactions`,
          method: 'POST',
          data,
        });

        await dispatch('find');
      } catch(error) {
        console.log(error);
      }
    },
  },
}
