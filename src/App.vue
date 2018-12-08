<template>
  <div id="appRoot">
    <!--  -->
    <template v-if="!$route.meta.public">
      <!-- 整个APP界面 -->
      <v-app id="inspire" class="app">
        <!-- 左边抽屉 -->
        <app-drawer class="app--drawer"></app-drawer>
        <!-- 顶部工具条 -->
        <app-toolbar class="app--toolbar"></app-toolbar>
        <!-- 页面主视图 -->
        <v-content>
          <!-- 主视图头部 Page Header -->
          <page-header v-if="$route.meta.breadcrumb"></page-header>
          <div :class="['page-wrapper', !$route.meta.breadcrumb && 'page-wrapper-nopageheader']">
            <router-view></router-view>
          </div>   
           <!-- 主视图底部 App Footer -->
          <v-footer height="auto" :class="['pa-3', 'app--footer']" :dark="$vuetify.dark" :color="$vuetify.theme.app">
            <span class="caption">FCT Team &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Genius Solution Center </span> <v-icon color="pink" small>favorite</v-icon>
          </v-footer>
        </v-content>
        <!-- 回到顶部按钮 -->
        <app-fab></app-fab>
        <!-- 主题设置 -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" :color="$vuetify.theme.primary" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer>        
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </div>
</template>
<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import AppFab from '@/components/AppFab';
import PageHeader from '@/components/PageHeader';
import menu from '@/api/menus/menu';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from  './event';
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
    }
  }),

  computed: {

  },

  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    }
  },

};
</script>


<style lang="stylus" scoped>
.setting-fab 
  top 50%!important
  right 0
  border-radius 0
.page-wrapper
  min-height:calc(100vh - 64px - 50px - 81px )
.page-wrapper-nopageheader
  min-height:calc(100vh - 64px - 50px )
</style>
<style>
/*滚动条*/
/* Let's get this party started */
::-webkit-scrollbar {
  width: 9px;
  height:9px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.13); 
  background: rgba(0, 0, 0, 0.13);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2); 
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(187,187,187,0.1); 
}
</style>
