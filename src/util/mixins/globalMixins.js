import { mapGetters, mapActions } from 'vuex';

export const globalMixin = {
  computed: {
    ...mapGetters(['theme'])
  },
  methods: {
    ...mapActions([
      'setTheme'
    ])
  }
};
