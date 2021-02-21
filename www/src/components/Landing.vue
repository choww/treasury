<template>
  <v-container>
    <v-row v-if="isAuthenticated">
      <Dashboard/>
    </v-row>
    <v-row v-else>
      <v-col>
        <!-- TODO create login & sign up tabs --> 
        <v-form v-if="!isSignup" ref="loginForm" v-model="valid" @submit="authenticate">
          <h1>Login</h1>
          <v-text-field label="Email" type="email" v-model="email" :rules="emailValidation"/>
          <v-text-field label="Password" type="password" v-model="password" :rules="passwordValidation"/>
          <v-btn type="submit" depressed color="primary">Login</v-btn>
        </v-form>

        <p><a href="#" @click="showSignup" v-if="!isSignup">Sign up</a></p>
        <p><a href="#" @click="showLogin" v-if="isSignup">Login</a></p>
        <v-form v-if="isSignup" ref="signupForm" v-model="valid" @submit="signup">
          <h1>Sign up</h1>
          <v-text-field label="First Name" type="text" v-model="firstName" :rules="nameValidation"/>
          <v-text-field label="Last Name" type="text" v-model="lastName" :rules="nameValidation"/>
          <v-text-field label="Email" type="email" v-model="email" :rules="emailValidation"/>
          <v-text-field label="Password" type="password" v-model="password" :rules="passwordValidation"/>
          <v-text-field label="Monthly Income" type="number" v-model="monthlyIncome" :rules="incomeValidation"/>
          <v-btn type="submit" depressed color="primary">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <p>{{ error }}</p>

  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Dashboard from '@/components/Dashboard';

export default {
  components: {
    Dashboard, 
  },
  data() {
    return {
      valid: false,
      firstName: '', 
      lastName: '', 
      email: '',
      password: '',
      error: '',
      monthlyIncome: 0,
      nameValidation: [name => !!name || 'First & last name are required'],
      emailValidation: [email => !!email || 'Email is required'],
      passwordValidation: [password => !!password || 'Password is required'],
      incomeValidation: [income => income > 0 || 'Income value must be greater than 0'],
      isSignup: false, 
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
      'createUser', 
    ]),
    showSignup() {
      this.isSignup = true;
    },
    showLogin() {
      this.isSignup = false;
    },
    async authenticate() {
      const { email, password } = this;
      const isValidForm = this.$refs.loginForm.validate()

      if (isValidForm) {
        await this.login({ email, password });
      }
    },
    async signup() {
      const { firstName, lastName, email, password, monthlyIncome } = this;
      const isValidForm = this.$refs.signupForm.validate();

      if (isValidForm) {
        await this.createUser({ 
          firstName, 
          lastName,
          email,
          password,
          monthlyIncome,
        });
      }
    },
  },
};
</script>
