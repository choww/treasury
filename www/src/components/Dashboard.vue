<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="12" v-if="showForm">
        <transaction-form :categories="categories" @cancel="resetForm" :transaction="transaction" :is-editing="isEditing"/>
      </v-col>

      <v-col :md="dashboardWidth" sm="12">
        <v-btn rounded primary @click="toggleForm">+</v-btn>
        <transactions :categories="categories" @edit="showEditForm"/>
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
  data() {
    return {
      showForm: false,
      dashboardWidth: 12,
      transaction: null,
    }
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
  methods: {
    ...mapActions('categories', ['getCategories']),
    toggleForm() {
      this.showForm = true;
      this.dashboardWidth = 8;
      this.isEditing = false;
    },
    resetForm() {
      this.showForm = false;
      this.dashboardWidth = 12;
      this.transaction = null;
      this.isEditing = false;
    },
    showEditForm(transaction) {
      this.toggleForm();
      this.transaction = transaction;
      this.isEditing = true;
    }
  },
}
</script>

