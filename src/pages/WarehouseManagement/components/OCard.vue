<template>
  <div id="o-card">
    <v-card :dark="$vuetify.dark" :color="contentBg">
      <v-divider v-if="enableHeader"></v-divider>
      <v-card-text>
        <slot name="card-content"></slot>       
      </v-card-text>       
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'o-card',
  props: {
    title: {
      type: String,
    },
    enableHeader: {
      type: Boolean,
      default: false
    },
    contentBg: {
      type: String,
      default: 'white'
    }
  },

  data () {
    return {

    };
  },
  computed: {

  },  
};
</script>
