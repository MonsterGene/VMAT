import themeList from '../api/themeOptions';
const actions = {
  setTheme: ({ commit }, theme) => {
    if (typeof theme === 'string') {
      theme = themeList.filter(v => v.name === theme)[0];
    }
    return commit('SET_THEME', theme);
  }
};

export default actions;
