<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12">
        <h2>Add transaction</h2>
        <v-form ref="form" v-model="valid" @submit.prevent="createTransaction">
          <v-radio-group label="Expense or Income?" v-model="isExpense">
            <v-radio color="primary" key="expense" label="Expense" :value="true"/>
            <v-radio color="primary" key="income" label="Income" :value="false"/>
          </v-radio-group>
          <v-text-field label="Amount" type="number" v-model="amount" :rules="amountValidation"/>
          <v-select :items="categories" label="Category" v-model="category" :rules="requiredField" />
          <v-menu v-model="showDatePicker" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on"/>
            </template>
            <v-date-picker v-model="date" color="primary"/>
          </v-menu>

          <v-btn type="submit" depressed color="primary">Submit</v-btn>
        </v-form>
      </v-col>

      <v-col md="8" sm="12">
        <v-btn-toggle mandatory v-model="filter">
          <v-btn @click="filterBy('month')">Monthly</v-btn>
          <v-btn @click="filterBy('year')">Yearly</v-btn>
        </v-btn-toggle>

        <h1>{{ currentMonth }}</h1>

        <v-row>
          <v-col md="4" sm="12">
            <v-card flat dark>
              <v-card-title>
                <v-icon lef>cash-usd</v-icon>
                <span class="title">Amount earned</span>
              </v-card-title>
              <v-card-text clas="headline">
                $
              </v-card-text>
            </v-card>
          </v-col>

          <v-col md="4" sm="12">
            <v-card flat dark>
              <v-card-title>
                <v-icon lef>cart</v-icon>
                <span class="title">Amount spent</span>
              </v-card-title>
              <v-card-text clas="headline">
                $
              </v-card-text>
            </v-card>
          </v-col>

          <v-col md="4" sm="12">
            <v-card flat dark>
              <v-card-title>
                <v-icon lef>wallet</v-icon>
                <span class="title">Amount saved</span>
              </v-card-title>
              <v-card-text clas="headline">
                $
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <p>Based on this month's saving pattern, you would save $__ in 6 months</p>

        <p>Amount spent per category:</p>

        <div v-for="transaction in transactions">
          <div>{{ transaction.category }} {{ transaction.isExpense ? '-' :'+' }}${{ transaction.amount }}</div>
          <div>{{ parseDate(transaction.date) }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
export default {
  created: async function() {
    const month = new Date().getMonth();
    await this.find({ filter: 'month', month });
    await this.getCategories();
  },
  data() {
    return {
      filter: 0, // 0 = filter by month, 1 = by year
      valid: false,
      showDatePicker: false,
      isExpense: true,
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: '',
      requiredField: [field => !!field || 'This is a required field'],
      amountValidation: [amount => amount && parseInt(amount) > 0 || "Amount must be greater than 0"],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.transactions,
    }),
    ...mapGetters('categories', ['categories']),
    currentMonth() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();

      return `${this.months[month]} ${year}`;
    },
  },
  methods: {
    ...mapActions('transactions', [
      'create',
      'find',
    ]),
    ...mapActions('categories', ['getCategories']),

    parseDate(dateString) {
      const date = new Date(dateString);
      const month = date.getMonth();
      const day = date.getDate();

      return `${this.months[month]} ${day}`;
    },
    resetForm() {
      this.isExpense = true;
      this.amount = 0;
      this.date = new Date().toISOString().split('T')[0];
      this.category = '';

      this.$refs.form.resetValidation();
    },
    async createTransaction() {
      const isValidForm = this.$refs.form.validate();

      if (isValidForm) {
        const params = {
          isExpense: this.isExpense,
          date: this.date,
          amount: this.amount,
          category: this.category,
        };

        await this.create(params);
        this.resetForm();
      }
    },

    async filterBy(filter) {
      switch(filter) {
        case 'year': {
          const year = new Date().getFullYear();
          return this.find({ filter, year });
        }
        case 'month': {
          const month = new Date().getMonth();
          return this.find({ filter, month });
        }

      }
    },
  },
}
</script>

