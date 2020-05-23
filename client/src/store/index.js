import Vue from 'vue'
import Vuex from 'vuex'

import search from './search';
import shared from './shared';
import offers from './offers';

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    search,
    shared,
    offers
  }
} )
