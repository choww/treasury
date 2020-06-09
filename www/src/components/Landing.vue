<template>
  <div>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axiosModule from 'axios';

export default {
  data: {},
  methods: {
    login: async () {
      const axios = axiosModule.create({
        baseURL: 'http://localhost:3000',
      });

      return axios.get('/login');
    },
  },
};
</script>
