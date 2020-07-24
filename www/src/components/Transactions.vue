<template>
  <div>
    <v-row>
      <v-col md="4" sm="12">
        <v-card flat dark>
          <v-card-title>
            <v-icon lef>cash-usd</v-icon>
            <span class="title">Amount earned</span>
          </v-card-title>
          <v-card-text clas="headline">
            $ {{ amtEarned }}
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
            ${{ amtSpent }}
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
            ${{ amtSaved }}
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  props: {
    filter: {
      type: String,
      default: 'month',
    },
    year: {
      type: Number,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  watch: {
    filte: async function(newFilter) {
      const { month } = this;
      await this.find({ filter: newFilter, month });
    },
    month: async function(newMonth) {
      const { filter } = this;
      await this.find({ filter, month: newMonth });
    },
    year: async function(newYear) {
      const { filter } = this;
      await this.find({ filter, year: newYear });
    },
  },
  created: async function() {
    const { month, filter } = this;
    await this.find({ filter, month });
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.transactions,
    }),
    ...mapGetters('transactions', ['amtEarned', 'amtSpent']),
    amtSaved() {
      return this.amtEarned - this.amtSpent;
    },
  },
  methods: {
    ...mapActions('transactions', ['find']),
    parseDate(dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();

      return `${month} ${day}`;
    },
  },
}
</script>
