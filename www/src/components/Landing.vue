<template>
  <div>
    <p>me: {{ me }}</p>
    <div v-if="isAuthenticated">
      welcome {{ me.firstName }} {{ me.lastName }}! <button @click="endSession">Logout</button>
    </div>
    <div v-else>
      <label>Email</label>
      <input type="email" v-model="email"/>
      <label>Password</label>
      <input type="password" v-model="password"/>
      <button @click="authenticate">Login</button>
    </div>

    <p>{{ error }}</p>

  </div>
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
