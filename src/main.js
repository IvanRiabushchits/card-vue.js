import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/styles.scss'

import routes from './routes';

const router = new VueRouter({routes});

Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')