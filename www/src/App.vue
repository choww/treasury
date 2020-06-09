<template>
  <div id="app">
    <router-view/>
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
