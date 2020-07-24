<template>
  <v-card color="grey" flat tile>
    <v-toolbar dark>
      <v-toolbar-title>Treasury</v-toolbar-title>
      <v-spacer/>
      <div v-if="isAuthenticated">
        welcome {{ userName }}! <v-btn @click="endSession">Logout</v-btn>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  created: async function() {
    await this.getCurrentUser();
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      me: state => state.authenticate.me,
    }),
    userName() {
      const { me } = this;
      if (!!me) {
        return `${me.firstName} ${me.lastName}`;
      }
    },
    isAuthenticated() {
      return !!this.me;
    },
  },
  methods: {
    ...mapActions('authenticate', [
      'getCurrentUser',
      'logout',
    ]),
    async endSession() {
      await this.logout();
      this.$router.push('/');
    },
  },
}
</script>
