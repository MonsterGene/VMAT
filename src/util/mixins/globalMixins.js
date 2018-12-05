import { mapGetters } from 'vuex';

export const globalMixin = {
  computed: {
    ...mapGetters(['theme'])
  }
};
