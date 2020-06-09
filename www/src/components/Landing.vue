<template>
  <div>
    <button @click="login" v-if="!isAuthenticated">Login</button>
    <button @click="logout" v-if="isAuthenticated">Logout</button>

    <p>{{ info }}</p>
  </div>
</template>

<script>
import axiosModule from 'axios';

export default {
  data() {
    return {
      api: 'http://localhost:3000',
      isAuthenticated: false,
    };
  },
  computed: {
    info() {
      return this.$route.params;
    },
    axios() {
    },
  },
  methods: {
    login: function() {
      window.location = `${this.api}/login`;
    },
    logout: function() {
      window.location = `${this.api}/logout`;
    },
  },
};
</script>
