<template>
  <v-form ref="form" v-model="valid" @submit.prevent="createTransaction">
    <h2>{{ action }} Transaction</h2>
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

    <v-btn depressed @click="$emit('cancel')">Cancel</v-btn>
    <v-btn type="submit" depressed color="primary">Submit</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: {
    action: {
      type: String,
      default: 'Add',
    },
    categories: {
      type: Array,
      required: true,
      immediate: true,
    },
    isEditing: Boolean,
    transaction: [Object, null],
  },
  watch: {
    transaction: {
      handler(newTransaction) {
        if (newTransaction) {
          const { isExpense, amount, date, category } = newTransaction;
          this.isExpense = isExpense;
          this.amount = amount;
          this.date = this.formatDate(date);
          this.category = category;
        }
      },
      immediate: true,
      deep: true,
    },
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
    };
  },
  methods: {
    ...mapActions('transactions', ['create', 'edit']),
    formatDate(date) {
      return new Date(date).toISOString().split('T')[0];
    },
    resetForm() {
      this.isExpense = true;
      this.amount = 0;
      this.date = this.formatDate(new Date());
      this.category = '';

      this.$refs.form.resetValidation();
      this.$emit('cancel');
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

        if (this.isEditing) {
          await this.edit({
            id: this.transaction._id,
            params,
          });
        } else {
          await this.create(params);
        }

        this.resetForm();
      }
    },
  },
}
</script>
