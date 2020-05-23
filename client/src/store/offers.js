import { getProductByOffers } from '../services/api';

export default {
  state: {
    data: {
      list: [],
      productImage: '',
      productTitle: '',
      productDescription: '',
    }
  },
  mutations: {
    setOffers ( state, payload ) {
      state.data = {};
      state.data.list = payload.list;
      state.data.productImage = payload.productImage;
      state.data.productTitle = payload.productTitle;
      state.data.productDescription = payload.productDescription;
    }
  },
  actions: {
    async setOffers ( { commit }, payload ) {
      try {
        commit( 'setLoading', true );
        const { data } = await getProductByOffers( payload );
        commit( 'setOffers', data );
        commit( 'setLoading', false );
      } catch ( e ) {
        commit( 'setLoading', false );
      }
    }
  },
  getters: {
    offers ( state ) {
      return state;
    }
  },
}