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
          <v-menu
            ref="datepicker"
            v-model="showDatePicker"
            offset-y
            min-width="290px"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on"/>
            </template>
            <v-date-picker v-model="date" color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="showDatePicker = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.datepicker.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn type="submit" depressed color="primary">Submit</v-btn>
        </v-form>
      </v-col>

      <v-col md="8" sm="12">
        <transactions :categories="categories"/>
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
      valid: false,
      showDatePicker: false,
      isExpense: true,
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: '',
      requiredField: [field => !!field || 'This is a required field'],
      amountValidation: [amount => amount && parseInt(amount) > 0 || "Amount must be greater than 0"],
    }
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    ...mapActions('transactions', ['create']),
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
  },
}
</script>

