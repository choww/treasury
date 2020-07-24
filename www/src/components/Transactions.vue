<template>
  <div>
    <v-btn-toggle mandatory v-model="filter">
      <v-btn value="month" @click="filterBy">Monthly</v-btn>
      <v-btn value="year" @click="filterBy">Yearly</v-btn>
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
      <v-col md="4" sm="12">
        <v-card flat dark>
          <v-card-title>
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

    <div v-for="transaction in transactions" :key="transaction._id">
      <div>{{ transaction.category }} {{ transaction.isExpense ? '-' :'+' }}${{ transaction.amount }}</div>
      <div>{{ parseDate(transaction.date) }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
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
    await this.getOldestTransaction();
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
      'years',
    ]),
    amtSaved() {
      return this.amtEarned - this.amtSpent;
    },
    monthNumber() {
      return this.months.indexOf(this.selectedMonth);
    },
    isFilteredByMonth() {
      return this.filter === 'month';
    },
  },
  methods: {
    ...mapActions('transactions', ['find', 'getOldestTransaction']),
    parseDate(dateString) {
      const date = new Date(dateString);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();

      return `${month} ${day}`;
    },
    async filterBy($event) {
      const { filter } = this;
      switch(filter) {
        case 'year': {
          return this.find({ filter, year: this.selectedYear });
        }
        case 'month': {
          return this.find({
            filter,
            month: this.monthNumber,
            year: this.selectedYear,
          });
        }

      }
    },
  },
}
</script>
