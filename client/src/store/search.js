import { searchByProduct } from '../services/api';

export default {
  state: {
    data: {
      list: [],
      total: 0,
    },
    query: '',
  },
  mutations: {
    setProducts ( state, payload ) {
      state.data.list = [];
      state.data.list = payload.list;
      state.data.total = payload.total_count;
    },
    setQuery ( state, payload ) {
      state.query = payload;
    }
  },
  actions: {
    async setProducts ( { commit }, payload ) {
      try {
        commit( 'setLoading', true );
        const { page, query } = payload;
        const { data } = await searchByProduct( query, page );
        commit( 'setProducts', data );
        commit( 'setLoading', false );
      } catch ( e ) {
        commit( 'setLoading', false );
      }
    },
    setQuery ( { commit }, payload ) {
      commit( 'setQuery', payload );
    }
  },
  getters: {
    products ( state ) {
      return state;
    }
  },
}