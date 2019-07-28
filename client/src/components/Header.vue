<template>
  <header>
    <router-link to="/" v-if="!signedIn()">Home</router-link>
    <router-link to="/signin" v-if="!signedIn()">Sign In</router-link>
    <router-link to="/signup" v-if="!signedIn()">Sign Up</router-link>
    <a href="#" @click.prevent="signOut" v-if="signedIn()">Sign out</a>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
    signedIn() {
      return localStorage.signedIn;
    },
    signOut() {
      this.$http.secured
        .delete('/signin')
        .then(() => {
          delete localStorage.csrf;
          delete localStorage.signedIn;
          this.$router.replace('/');
        })
        .catch((error) => this.setError(error, 'Cannot sign out'));
    }
  }
};
</script>

<style scoped lang="scss">
header {
  a {
    margin: 0 10px;
  }
}
</style>
