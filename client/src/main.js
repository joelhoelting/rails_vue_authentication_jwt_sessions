import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { plainAxiosInstance, securedAxiosInstance } from './axios';

Vue.use(Vuex);

Vue.use(VueAxios, {
  plain: plainAxiosInstance,
  secured: securedAxiosInstance
});

Vue.config.productionTip = false;

new Vue({
  router,
  plainAxiosInstance,
  securedAxiosInstance,
  render: (h) => h(App)
}).$mount('#app');
