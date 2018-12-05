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
            <v-btn-toggle v-model="sideBarOption">
              <v-btn flat value="dark">
                Dark
              </v-btn>
              <v-btn flat value="light">
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
      sideBarOption: 'light',
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
            sideNav: '#2196F3',
            mainNav: '#2196F3',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'teal',
          value: {
            sideNav: '#009688',
            mainNav: '#009688',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'red',
          value: {
            sideNav: '#F44336',
            mainNav: '#F44336',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'orange',
          value: {
            sideNav: '#FF9800',
            mainNav: '#FF9800',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'purple',
          value: {
            sideNav: '#9C27B0',
            mainNav: '#9C27B0',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'indigo',
          value: {
            sideNav: '#3F51B5',
            mainNav: '#3F51B5',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'cyan',
          value: {
            sideNav: '#00BCD4',
            mainNav: '#00BCD4',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'pink',
          value: {
            sideNav: '#E91E63',
            mainNav: '#E91E63',
            sideManu: '#FFFFFF'
          }
        },
        {
          key: 'green',
          value: {
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
        this.$set(this.$vuetify.theme, 'primaryName', val);
        this.$vuetify.theme.primary = this.colors[val] && this.colors[val].base || val;
        this.setTheme(this.themeColorOptions.filter(v => v.key === val)[0].value);
      },
      immediate: true
    },
    sideBarOption: {
      handler (val) {
        this.$vuetify.dark = (val === 'dark');
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

