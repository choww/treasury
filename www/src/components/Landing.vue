<template>
  <div>
    <p>logged in? {{ isAuthenticated }}</p>
    <label>Email</label>
    <input type="email" v-model="email"/>
    <label>Password</label>
    <input type="password" v-model="password"/>
    <button @click="authenticate" v-if="!isAuthenticated">Login</button>
    <button @click="logout" v-if="isAuthenticated">Logout</button>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.authenticate.isAuthenticated,
    }),
  },
  methods: {
    ...mapActions('authenticate', [
      'login',
    ]),
    async authenticate() {
      const params = {
        email: this.email,
        password: this.password,
      };

      await this.login(params)
    },
    logout: function() {
      // window.location = `${this.api}/logout`;
    },
  },
};
</script>
