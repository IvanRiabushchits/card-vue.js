import Vue from 'vue'
import App from './App.vue'
import './assets/styles.scss'
import CardDataTable from "@/components/CardDataTable";
import CardForm from "@/components/CardForm";

Vue.use(VueRouter);


let router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'card-data-table',
      component: CardDataTable,
      props: true
    },

    {
      path: '/card-form',
      name: 'card-form',
      component: CardForm,
      props: true
    }

  ]
});

export default router;
new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  router
}).$mount('#app')

