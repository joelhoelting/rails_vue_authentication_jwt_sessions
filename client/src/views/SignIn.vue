<template>
  <form @submit.prevent="signin">
    <h3>Sign In</h3>

    <div class="error-div" v-if="error">{{error}}</div>
    <div>
      <label for="email">Email Address</label>
      <input type="email" v-model="email" id="email" placeholder="your@email.com" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" v-model="password" id="password" placeholder="Password" />
    </div>

    <button type="submit">SUBMIT</button>
    <div>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  created() {
    this.checkSignIn();
  },
  updated() {
    this.checkSignIn();
  },
  methods: {
    signin() {
      this.$http.plain
        .post('/signin', { email: this.email, password: this.password })
        .then((response) => this.signInSuccessful(response))
        .catch((error) => this.signInFailed(error));
    },
    signInSuccessful(response) {
      if (!response.data.csrf) {
        this.signInFailed(response);
        return;
      }

      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = '';
      this.$router.replace('/todos');
    },
    signInFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || '';
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/todos');
      }
    }
  }
};
</script>
