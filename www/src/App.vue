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

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    name() {
      return this.$route.name;
    },
  },
};
</script>
