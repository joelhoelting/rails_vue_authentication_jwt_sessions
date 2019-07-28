<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ url }}</p>
  </div>
</template>

<style scoped lang="scss">
.home {
  background: none;
}
</style>

<script>
export default {
  name: 'home',
  data() {
    return {
      url: process.env.VUE_APP_URL
    };
  }
};
</script>
