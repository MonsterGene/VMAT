<template>
  <v-layout row justify-center>
    <v-dialog v-model="openDialogs" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">{{ titleDialogs }}</v-card-title>
        <v-card-text>{{ contentDialogs }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
  components: {
  },
  props: ['titleDialogs', 'contentDialogs', 'openDialogs'],
  data () {
    return {
    };
  },
  computed: {
    open () {
      return this.openDialogs;
    }
  },
  watch: {
    openDialogs () {
      console.log('in dialogs');
      this.open = true;
    }
  }, 
  methods: {

  }
};
</script>

<style lang='stylus' scoped>
</style>