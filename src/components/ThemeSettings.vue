<template>
<div id="themeSetting">
  <v-toolbar :color="$vuetify.theme.primary" dark>
    <v-toolbar-title>
      Theme Settings
    </v-toolbar-title>
  </v-toolbar>
  <v-container :dark="$vuetify.dark">
    <v-layout column>
      <v-flex>
        <v-subheader class="px-1 my-2">
          Color Option
        </v-subheader>
        <div class="color-option">
          <v-layout wrap>
            <label class="color-option--label flex xs6 pa-1" v-for="(option,index) in themeColorOptions" :key="option.name">
              <input type="radio" name="color" v-bind:value="option.name" v-model="themeColor">
              <span class="color-option--item bg" :style="{background: option.colors.app+'!important'}">
                <span class="overlay">
                  <span class="material-icons">check</span>
                </span>
                <span class="color-option--item--header sideNav" :style="{background: option.colors.sideNav+'!important'}"></span>
                <span class="color-option--item--header mainNav" :style="{background: option.colors.mainNav+'!important'}"></span>
                <span class="sideMenu" :style="{background: option.colors.sideMenu+'!important'}"></span>
              </span>
            </label>
          </v-layout>
        </div>
        <div class="theme-options">
          <v-subheader class="px-1 my-2">
            Lighten Option
          </v-subheader>
          <v-divider></v-divider>
          <div class="my-3">
            <v-btn-toggle v-model="darkTheme">
              <v-btn flat :value="true"><!-- :disabled="!theme.darkSettable" -->
                Dark
              </v-btn>
              <v-btn flat :value="false">
                Light
              </v-btn>
            </v-btn-toggle>   
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
import themeList from '../api/themeOptions';
import { globalMixin } from '../util/mixins/globalMixins';

export default {
  mixins: [globalMixin],
  data () {
    return {
      themeColor: 'jean-black',
      darkTheme: false,
      colors: colors,
      themeColorOptions: themeList,
    };
  },
  computed: {
    defaultTheme () {
      return {
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      };
    }
  },
  watch: {
    'theme.name' (val) {
      console.log('theme.name changed!');
      this.themeColor = val;
    },
    themeColor: {
      handler (val) {
        const theme = this.themeColorOptions.filter(v => v.name === val)[0];
        this.$vuetify.theme = Object.assign(JSON.parse(JSON.stringify(this.defaultTheme)), theme.colors);
        this.darkTheme = theme.isDark;
        this.setTheme(theme);
      },
      immediate: true
    },
    darkTheme: {
      handler (val) {
        this.$nextTick(() => {
          this.$vuetify.dark = val;
        });
      },
      immediate: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer  
    & input[type="radio"] 
      display:none
      &+span 
        position: relative
        &>.overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.3);
          text-align: center;
          line-height: 30px;
          color: #fff;                
      &:checked+span>.overlay
        display:block  
    & .bg        
      background-color: #f1f1f1
  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    margin-bottom: 15px;      
    &--header
      height: 10px
    &>span 
      display: block;
      float: left;
      width: 50%;
      height: 20px;          
</style>

