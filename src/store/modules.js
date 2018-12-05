const store = {
  state: {
    theme: {}
  },
  mutations: {
    'SET_THEME': (state, theme) => {
      state.theme = theme;
    }
  }
};

export default store;
