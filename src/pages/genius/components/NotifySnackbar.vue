<template>
   <v-snackbar
      v-model="openSnackbar"
      :timeout="8000"
    >
      {{ title }}
    </v-snackbar>
</template>

<script>

export default {
  components: {
  },
  props: ['title', 'open'],
  data () {
    return {
      openSnackbar: false,
    };
  },
  watch: {
    open () {
      this.openSnackbar = !this.openSnackbar;
    }
  },   
  methods: {
  }
};
</script>

<style lang='stylus' scoped>
</style>