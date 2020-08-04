<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12">
        <transaction-form :categories="categories"/>
      </v-col>

      <v-col md="8" sm="12">
        <transactions :categories="categories"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Transactions from '@/components/Transactions';
import TransactionForm from '@/components/TransactionForm';
export default {
  components: {
    Transactions,
    TransactionForm,
  },
  created: async function() {
    await this.getCategories();
  },
  // data() {
  //   return {
  //     valid: false,
  //     showDatePicker: false,
  //     isExpense: true,
  //     amount: 0,
  //     date: new Date().toISOString().split('T')[0],
  //     category: '',
  //     requiredField: [field => !!field || 'This is a required field'],
  //     amountValidation: [amount => amount && parseInt(amount) > 0 || "Amount must be greater than 0"],
  //   }
  // },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    // ...mapActions('transactions', ['create']),
    ...mapActions('categories', ['getCategories']),
    // resetForm() {
    //   this.isExpense = true;
    //   this.amount = 0;
    //   this.date = new Date().toISOString().split('T')[0];
    //   this.category = '';

    //   this.$refs.form.resetValidation();
    // },
    // async createTransaction() {
    //   const isValidForm = this.$refs.form.validate();

    //   if (isValidForm) {
    //     const params = {
    //       isExpense: this.isExpense,
    //       date: this.date,
    //       amount: this.amount,
    //       category: this.category,
    //     };

    //     await this.create(params);
    //     this.resetForm();
    //   }
    // },
  },
}
</script>

