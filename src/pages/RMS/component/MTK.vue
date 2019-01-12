<template>
<v-dialog
  v-model="open"
  persistent
  width="70%"
  class="text-xs-center"
>
  <v-card>
    <!-- <v-card-title
      class="headline grey lighten-2"
      primary-title
    >
      Privacy Policy
    </v-card-title> -->

    <v-card-text>
      <slot name= "content"></slot>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="$emit('close', false)"
      >
        close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
// import VWidget from '@/components/VWidget';
export default {
  // components: {
  //   VWidget
  // },
  model: {
    prop: 'open',
    event: 'close'
  },
  props: ['open'],
  data () {
    return {
      dialog: false
    };
  },
  watch () {
    this.$emit('close', false);
    
  }
};
</script>

<style lang='stylus' scoped>
  div
    margin 0 auto
</style>