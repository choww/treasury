<template>
  <v-container>
    <v-row>
      <p>me: {{ me }}</p>
      <v-col v-if="isAuthenticated">
        welcome {{ me.firstName }} {{ me.lastName }}! <v-btn @click="endSession">Logout</v-btn>
      </v-col>

      <v-col v-else>
        <label>Email</label>
        <input type="email" v-model="email"/>
        <label>Password</label>
        <input type="password" v-model="password"/>
        <v-btn @click="authenticate">Login</v-btn>
      </v-col>
    </v-row>

    <p>{{ error }}</p>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  created: async function() {
    await this.getCurrentUser();
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  computed: {
    ...mapState({
      me: state => state.authenticate.me,
    }),
    isAuthenticated() {
      return !!this.me;
    }
  },
  methods: {
    ...mapActions('authenticate', [
      'login',
      'logout',
      'getCurrentUser',
    ]),
    async authenticate() {
      const { email, password } = this;

      if (!email || !password) {
        this.error = 'Please fill in both fields';
        return;
      }

      await this.login({ email, password });

      this.email = '';
      this.password = '';
      this.error = '';
    },
    async endSession() {
      await this.logout();
    },
  },
};
</script>
