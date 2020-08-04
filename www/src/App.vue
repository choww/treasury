<template>
  <div id="app">
    <v-app>
      <v-main>
        <nav-bar/>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { getJWT } from '@/helpers';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  // created: function() {
  //   const token = getJWT();
  //   const isValidJWT = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   console.log(isValidJWT);
  // },
  computed: {
    name() {
      return this.$route.name;
    },
  },
};
</script>
