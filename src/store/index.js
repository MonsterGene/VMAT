import Vue from 'vue';
import Vuex from 'vuex';
import tipbu6Streams from './modules';
import tipbu6StreamsGetters from './getters';
import tipbu6StreamsActions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tipbu6Streams
  },
  getters: {
    ...tipbu6StreamsGetters
  },
  actions: {
    ...tipbu6StreamsActions
  }
});