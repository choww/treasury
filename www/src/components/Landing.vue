<template>
  <div>
    <button @click="login" v-if="!$auth.isAuthenticated">Login</button>
    <button @click="logout" v-if="$auth.isAuthenticated">Logout</button>

    <p>{{ $auth.user }}</p>
  </div>
</template>

<script>
import axiosModule from 'axios';

export default {
  data() {
    return {
      api: 'http://localhost:3000',
      // isAuthenticated: false,
    };
  },
  computed: {
    info() {
      // return this.$auth;
    },
  },
  methods: {
    login() {
      // window.location = `${this.api}/login`;
      this.$auth.login();
    },
    logout: function() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
      // window.location = `${this.api}/logout`;
    },
  },
};
</script>
