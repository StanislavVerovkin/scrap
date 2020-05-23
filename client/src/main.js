import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import { Table, Input, Field, Loading } from 'buefy'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'buefy/dist/buefy.css'

Vue.use( BootstrapVue );
Vue.use( Table );
Vue.use( Field );
Vue.use( Input );
Vue.use( Loading );

Vue.config.productionTip = false;

new Vue( {
  router,
  store,
  render: h => h( App )
} ).$mount( '#app' );
