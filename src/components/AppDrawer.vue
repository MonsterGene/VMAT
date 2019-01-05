<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    app
    :dark="$vuetify.dark"
    v-model="drawer"
    :stateless="true"
    width="260"
    :style="sideToolbarColor"
    >
    <!-- 顶部logo title -->
    <v-toolbar :color="$vuetify.theme.sideNav">
      <img v-bind:src="computeLogo" height="36" alt="Vue Material Admin Template">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down" style="color: #fff">Genius Solution</span>
      </v-toolbar-title>
    </v-toolbar>
    <!-- 菜单栏 -->
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <menu-tree :menus="menus"></menu-tree>
    </vue-perfect-scrollbar>        
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menus/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { globalMixin } from '../util/mixins/globalMixins.js';
import MenuTree from './SidebarMenu';

export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
    MenuTree
  },
  mixins: [globalMixin],
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: true,
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/logo.png';
    },

    sideToolbarColor () {
      const sideMenu = this.$vuetify.theme.sideMenu;
      if (typeof sideMenu === 'string') {
        if (this.theme && this.theme.lightSupport === 'light' && !this.$vuetify.dark) {
          return { background: sideMenu };
        } else if (this.theme && this.theme.lightSupport === 'dark' && this.$vuetify.dark) {
          return { background: sideMenu };
        } else {
          return {};
        }
      } else if (sideMenu && (sideMenu.dark || sideMenu.light)) {
        if (this.$vuetify.dark && sideMenu.dark) {
          return { background: sideMenu.dark };
        } else if (this.$vuetify.light && sideMenu.light) {
          return { background: sideMenu.light };
        } else {
          return {};
        }
      } else {
        return {};
      }
    }    
  },
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = (!this.drawer);
    });
  },
  methods: {
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component
        };
      }
      if (subItem.path) {
        return { path: item.group + '/' + subItem.path };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>
