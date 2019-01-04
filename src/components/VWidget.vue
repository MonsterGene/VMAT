<template>
  <div id="v-widget">
    <v-card :dark="isDark" :color="contentBg">
      <v-toolbar :dark="headerDark" :color="headerBg" flat dense card v-if="enableHeader">
        <v-toolbar-title><h4>{{title}}</h4></v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="widget-header-action"></slot>
      </v-toolbar>
      <v-divider v-if="enableHeader"></v-divider>
      <v-card-text>
        <slot name="widget-content"></slot>       
      </v-card-text>       
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'v-widget',
  props: {
    title: {
      type: String,
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentBg: {
      type: String,
      default: 'white'
    },
    headerBg: {
      type: String,
      default: 'transparent'
    },
    headerDark: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {

    };
  },
  computed: {
    isDark () {
      if (typeof this.dark !== 'undefined') {
        return this.dark;
      } else {
        return this.$vuetify.dark;
      }
    }
  },  
};
</script>
