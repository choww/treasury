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
          <v-btn value="month" @click="filterBy">Monthly</v-btn>
          <v-btn value="year" @click="filterBy">Yearly</v-btn>
        </v-btn-toggle>

        <v-tabs
          v-model="selectedMonth"
          color="purple"
          center-active
          grow
          show-arrows
        >
          <v-tab
            v-for="month in months"
            :key="month"
            :href="`#${month}`"
          >
            {{ month }}
          </v-tab>
        </v-tabs>


        <transactions :month="monthNumber" :filter="filter"/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Transactions from '@/components/Transactions';
export default {
  components: {
    Transactions,
  },
  created: async function() {
    await this.getCategories();
  },
  data() {
    return {
      filter: 'month',
      valid: false,
      showDatePicker: false,
      isExpense: true,
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      selectedMonth: new Date().toLocaleString('default', { month: 'short' }),
      category: '',
      requiredField: [field => !!field || 'This is a required field'],
      amountValidation: [amount => amount && parseInt(amount) > 0 || "Amount must be greater than 0"],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  },
  computed: {
    ...mapGetters('categories', ['categories']),
    monthNumber() {
      return this.months.indexOf(this.selectedMonth);
    }
  },
  methods: {
    ...mapActions('transactions', [
      'create',
      'find',
    ]),
    ...mapActions('categories', ['getCategories']),
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

    async filterBy($event) {
      const { filter } = this;
      switch(filter) {
        case 'year': {
          const year = new Date().getFullYear();
          return this.find({ filter, year });
        }
        case 'month': {
          return this.find({
            filter,
            month: this.monthNumber,
          });
        }

      }
    },
  },
}
</script>

