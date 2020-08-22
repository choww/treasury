import { axiosConfigs } from '@/helpers';

export default {
  namespaced: true,
  state: {
    transactions: [],
    // olest transaction for the current user
    oldest: null,
  },
  mutations: {
    transactions(state, data) {
      state.transactions = data;
    },
    oldest(state, data) {
      state.oldest = data;
    },
  },
  getters: {
    /**
     * return an array of numbers representing the years in between
     * the first transaction and the current year
     */
    years: state => {
      const currYear = new Date().getFullYear();
      if (!state.oldest) return [currYear];

      const firstTransactionDate = state.oldest.date;
      const year1 = new Date(firstTransactionDate).getFullYear();
      const yearRange = (currYear - year1) + 1;

      return [...Array(yearRange).keys()].map(num => year1 + num);
    },
    expenses: state => {
      return state.transactions.filter(transaction => transaction.isExpense);
    },
    amtEarned: state => {
      const earned = state.transactions.filter(transaction => !transaction.isExpense);
      if (!earned.length) return 0;
      return earned.reduce((accumulated, transaction) => {
        return accumulated + transaction.amount
      }, 0);
    },
    amtSpent: state => {
      const spent = state.transactions.filter(transaction => transaction.isExpense);
      if (!spent.length) return 0;
      return spent.reduce((accumulated, transaction) => {
        return accumulated + transaction.amount
      }, 0);
    },
  },
  actions: {
    find: async({ commit }, filters = null) => {
      const axios = axiosConfigs();
      const params = Object.assign(filters, { sort: { date: -1 } });
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

        const transactionDate = new Date(date);
        const month = transactionDate.getMonth();
        const year = transactionDate.getFullYear();
        await dispatch('find', { filter: 'month', month, year });
      } catch(error) {
        console.log(error);
      }
    },

    edit: async ({ dispatch }, { id, params }) => {
      const axios = axiosConfigs();
      const { amount } = params;
      if (amount) {
        params.amount = parseInt(amount);
      }
      try {
        await axios({
          url: `${process.env.API_URL}/transactions/${id}`,
          method: 'PATCH',
          data: params,
        });
      } catch(error) {
        console.log(error);
      }
    },

    getOldest: async ({ commit }) => {
      const axios = axiosConfigs();
      const { data } = await axios.get(`${process.env.API_URL}/transactions/oldest`);
      commit('oldest', data);
    },

    delete: async ({ dispatch }, { id }) => {
      const axios = axiosConfigs();
      const { data } = await axios.delete(`${process.env.API_URL}/transactions/${id}`);

      const transactionDate = new Date(data.date);
      const month = transactionDate.getMonth();
      const year = transactionDate.getFullYear();
      await dispatch('find', { filter: 'month', month, year });
    },
  },
}
