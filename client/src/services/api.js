import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use( VueAxios, axios );

export const searchByProduct = ( query, page ) => {
  return Vue.axios.get( `/api/search/${query}&page=${page - 1}` );
};

export const getProductByOffers = ( product ) => {
  return Vue.axios.get( `/api/offers/${product}/prices` );
};