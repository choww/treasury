<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    name() {
      return this.$route.name;
    },
  },
};
</script>
