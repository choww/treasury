<template>
  <div>
    <button @click="login" v-if="!isAuthenticated">Login</button>
    <button @click="logout" v-if="isAuthenticated">Logout</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      api: 'http://localhost:3000',
      isAuthenticated: false,
    };
  },
  computed: {
  },
  methods: {
    login() {
      // window.location = `${this.api}/login`;
    },
    logout: function() {
      // window.location = `${this.api}/logout`;
    },
  },
};
</script>
