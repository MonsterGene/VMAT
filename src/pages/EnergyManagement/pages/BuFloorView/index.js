import SourceTypeBar from '../../components/common/SourceTypeBar.vue';
import SearchBar from '../../components/BU/SearchBar.vue';
import Bu from './Bu.vue';
import Floor from './Floors.vue';
// const bu = import('./Bu.vue');
// const floor = import('./Floors.vue');
console.log(Bu);

export default {
  template: `
  <v-container
    grid-list-xl
    fluid
  >
    <source-type-bar></source-type-bar>
    <v-layout
      row
      wrap
      justify-end
      align-center
    >
      <v-flex md12>
        <search-bar @condition-change="searchBarChange" @body-change="mainBody=$event"></search-bar>
      </v-flex>
    </v-layout>
    <component v-bind:is="currentPage"></component>
  </v-container>
  `,
  components: {
    SourceTypeBar,
    SearchBar
  },
  data: () => ({
    bu: Bu,
    floor: Floor,
    mainBody: 'floor',
    searchCondition: {}
  }),
  computed: {
    currentPage () {
      return this.mainBody === 'floor' ? this.floor : this.bu;
    }
  },
  methods: {
    searchBarChange (evt) {
      this.searchCondition = evt;
    }
  },
};