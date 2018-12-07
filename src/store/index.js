import Vue from 'vue';
import Vuex from 'vuex';
import theme from './modules';
import themeGetters from './getters';
import themeActions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global: theme
  },
  getters: {
    ...themeGetters
  },
  actions: {
    ...themeActions
  }
});