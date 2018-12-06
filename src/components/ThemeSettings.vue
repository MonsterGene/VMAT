<template>
<div id="themeSetting">
  <v-toolbar :color="themeColor" dark>
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
            <label class="color-option--label flex xs6 pa-1" v-for="(option,index) in themeColorOptions" :key="index">
              <input type="radio" name="color" v-bind:value="option.key" v-model="themeColor">
              <span class="color-option--item bg" :style="{background: option.value.layout}">
                <span class="overlay">
                  <span class="material-icons">check</span>
                </span>
                <span class="color-option--item--header sideNav" :style="{background: option.value.sideNav}"></span>
                <span class="color-option--item--header mainNav" :style="{background: option.value.mainNav}"></span>
                <span class="sideMenu" :style="{background: option.value.sideManu}"></span>
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
              <v-btn flat :disabled="!theme.darkSettable" :value="true">
                Dark
              </v-btn>
              <v-btn flat :disabled="!theme.darkSettable" :value="false">
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
import { globalMixin } from '../util/mixins/globalMixins.js';

export default {
  mixins: [globalMixin],
  data () {
    return {
      themeColor: 'blue',
      darkTheme: false,
      colors: colors
    };
  },
  computed: {
    themeColorOptions () {
      return [
        {
          key: 'jean-black',
          value: {
            isDark: true,
            darkSettable: false,
            primary: '#24262c',
            sideNav: '#24262c',
            mainNav: '#24262c',
            sideManu: '#30333B',
            layout: '#000000',
            header: '#282A30',
            content: '#282A30'
          }
        },
        {
          key: 'blue',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#2196F3',
            sideNav: '#2196F3',
            mainNav: '#2196F3',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'teal',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#009688',
            sideNav: '#009688',
            mainNav: '#009688',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'red',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#F44336',
            sideNav: '#F44336',
            mainNav: '#F44336',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'orange',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#FF9800',
            sideNav: '#FF9800',
            mainNav: '#FF9800',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'purple',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#9C27B0',
            sideNav: '#9C27B0',
            mainNav: '#9C27B0',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'indigo',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#3F51B5',
            sideNav: '#3F51B5',
            mainNav: '#3F51B5',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'cyan',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#00BCD4',
            sideNav: '#00BCD4',
            mainNav: '#00BCD4',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'pink',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#E91E63',
            sideNav: '#E91E63',
            mainNav: '#E91E63',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'green',
          value: {
            isDark: false,
            darkSettable: false,
            primary: '#4CAF50',
            sideNav: '#4CAF50',
            mainNav: '#4CAF50',
            sideManu: '#FFFFFF'
          }
        }
      ];
    }
  },  
  watch: {
    themeColor: {
      handler (val) {
        const theme = this.themeColorOptions.filter(v => v.key === val)[0].value;
        theme.name = val;
        this.$vuetify.theme = theme;
        this.$vuetify.dark = theme.isDark;
        this.darkTheme = theme.isDark;
        this.setTheme(this.themeColorOptions.filter(v => v.key === val)[0].value);
      },
      immediate: true
    },
    darkTheme: {
      handler (val) {
        this.$vuetify.dark = val;
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

