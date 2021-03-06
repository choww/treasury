<template>
  <div>
    <v-btn-toggle mandatory v-model="filter" @change="filterBy">
      <v-btn value="month">Monthly</v-btn>
      <v-btn value="year">Yearly</v-btn>
    </v-btn-toggle>

    <v-tabs
      v-model="selectedYear"
      center-active
      grow
      show-arrows
      @change="filterBy(filter)"
    >
      <v-tab
        v-for="year in years"
        :key="year"
        :href="`#${year}`"
      >
        {{ year }}
      </v-tab>
    </v-tabs>

    <v-tabs
      v-if="isFilteredByMonth"
      v-model="selectedMonth"
      @change="filterBy(filter)"
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

    <v-row>
      <v-col md="4" xs="12">
        <v-card flat dark>
          <v-card-title>
            <span class="title">Amount earned</span>
          </v-card-title>
          <v-card-text clas="headline">
            $ {{ amtEarned }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" xs="12">
        <v-card flat dark>
          <v-card-title>
            <span class="title">Amount spent</span>
          </v-card-title>
          <v-card-text clas="headline">
            ${{ amtSpent }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" xs="12">
        <v-card flat dark>
          <v-card-title>
            <span class="title">Amount saved</span>
          </v-card-title>
          <v-card-text clas="headline">
            ${{ amtSaved }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <p v-if="isFilteredByMonth">
      Based on this month's saving pattern, you would save ${{ amtSaved6Months }} in 6 months
    </p>

    <v-row>
      <v-col md="6" xs="12">
        <v-card>
          <v-card-title>Expense breakdown by category:</v-card-title>
          <v-card-text v-for="expense in expenseByCategory">
            {{ expense.category }} ${{ expense.amount }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6" xs="12">
        <h3>Transactions</h3>
        <v-timeline align-top dense>
          <v-timeline-item
            small
            v-for="transaction in transactions"
            :key="transaction._id"
          >
            <v-row>
              <v-col md="4" sm="12" xs="12">
                <small>{{ parseDate(transaction.date) }}</small>
              </v-col>
              <v-col md="8" sm="12" xs="12">
                <strong>{{ transaction.category }} {{ transaction.isExpense ? '-' :'+' }}${{ transaction.amount }}</strong>
                <v-btn @click="deleteTransaction(transaction._id)">x</v-btn>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  // watch: {
  //   filte: async function(newFilter) {
  //     const { month } = this;
  //     await this.find({ filter: newFilter, month });
  //   },
  //   month: async function(newMonth) {
  //     const { filter } = this;
  //     await this.find({ filter, month: newMonth });
  //   },
  //   year: async function(newYear) {
  //     const { filter } = this;
  //     await this.find({ filter, year: newYear });
  //   },
  // },
  created: async function() {
    const { monthNumber, selectedYear, filter } = this;
    await this.getOldest();
    await this.find({
      filter,
      month: monthNumber,
      year: selectedYear,
    });
  },
  data() {
    return {
      filter: 'month',
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().toLocaleString('default', { month: 'short' }),
       months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
  },
  computed: {
    ...mapState({
      transactions: state => state.transactions.transactions,
    }),
    ...mapGetters('transactions', [
      'amtEarned',
      'amtSpent',
      'expenses',
      'years',
    ]),
    amtSaved() {
      return this.amtEarned - this.amtSpent;
    },
    amtSaved6Months(){
      return this.amtSaved * 6;
    },
    monthNumber() {
      return this.months.indexOf(this.selectedMonth);
    },
    isFilteredByMonth() {
      return this.filter === 'month';
    },
    expenseByCategory() {
      const expenses = this.categories.map(category => {
        const filtered = this.expenses.filter(transaction => transaction.category === category);
        const totalExpense = filtered.reduce((sum, expense) => {
          return sum + expense.amount;
        }, 0);

        return { category, amount: totalExpense };
      });

      return expenses;
    },
  },
  methods: {
    ...mapActions('transactions', ['find', 'delete', 'getOldest']),
    parseDate(dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    },
    async filterBy($event) {
      const { filter, selectedYear } = this;
      const params = { filter, year: selectedYear };

      if (this.isFilteredByMonth) params.month = this.monthNumber;

      return this.find(params);
    },
    async deleteTransaction(id) {
      await this.delete({ id })
    },
  },
}
</script>
