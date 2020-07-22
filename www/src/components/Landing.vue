<template>
  <v-container>
    <v-row>
      <v-col v-if="isAuthenticated">
        <p>me: {{ me }}</p>
        welcome {{ me.firstName }} {{ me.lastName }}! <v-btn @click="endSession">Logout</v-btn>
      </v-col>

      <v-col v-else>
        <v-form ref="loginForm" v-model="valid">
          <v-text-field label="Email" type="email" v-model="email" :rules="emailValidation"/>
          <v-text-field label="Password" type="password" v-model="password" :rules="passwordValidation"/>
          <v-btn color="primary" @click="authenticate">Login</v-btn>
        </v-form>
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
      valid: false,
      email: '',
      password: '',
      error: '',
      emailValidation: [email => !!email || 'Email is required'],
      passwordValidation: [password => !!password || 'Password is required'],
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
      const isValidForm = this.$refs.loginForm.validate()

      if (isValidForm) {
        await this.login({ email, password });
      }
    },
    async endSession() {
      await this.logout();
      this.$refs.loginForm.reset();
    },
  },
};
</script>
