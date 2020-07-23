<template>
  <v-container>
    <v-row>
      <v-col v-if="!isAuthenticated">
        <v-form ref="loginForm" v-model="valid" @submit="authenticate">
          <v-text-field label="Email" type="email" v-model="email" :rules="emailValidation"/>
          <v-text-field label="Password" type="password" v-model="password" :rules="passwordValidation"/>
          <v-btn type="submit" depressed color="primary">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <p>{{ error }}</p>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
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
    ]),
    async authenticate() {
      const { email, password } = this;
      const isValidForm = this.$refs.loginForm.validate()

      if (isValidForm) {
        await this.login({ email, password });
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>
