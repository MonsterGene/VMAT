import { mapGetters, mapActions } from 'vuex';
import themeList from '../../api/themeOptions';

export const globalMixin = {
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    ...mapActions([
      'setTheme'
    ]),
    refreshTheme (theme) {
      const defaultColors = () => ({
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      });
      if (typeof theme === 'string') {
        theme = themeList.filter(v => v.name === theme)[0];
      }
      if (theme && theme.name) {
        theme.colors = Object.assign(defaultColors(), theme.colors);
        this.setTheme(theme);
        if (this.$vuetify) {
          this.$vuetify.theme = theme.colors;
          this.$vuetify.dark = theme.isDark;
        }
        return theme;
      }
    }
  }
};

export const energyManageMixin = {
  methods: {
    simpleParseParams (p) {
      let data = new FormData();
      Object.keys(p).forEach(key => {
        data.append(key, p[key]);
      });
      return data;
    }
  }
};
