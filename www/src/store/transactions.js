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
    find: async({ commit }, params = null) => {
      const axios = axiosConfigs();
      const { data } = await axios({
        url: `${process.env.API_URL}/transactions`,
        params,
      });
      commit('transactions', data.transactions);
    },

    create: async ({ dispatch }, { isExpense, amount, date, category }) => {
      const axios = axiosConfigs();
      const data = {
        isExpense,
        amount: parseInt(amount),
        date,
        category,
      };
      try {
        await axios({
          url: `${process.env.API_URL}/transactions`,
          method: 'POST',
          data,
        });

        const month = new Date().getMonth();
        await dispatch('find', { filter: 'month', month });
      } catch(error) {
        console.log(error);
      }
    },
  },
}
