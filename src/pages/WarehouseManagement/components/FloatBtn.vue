<template>
    <v-speed-dial
      v-model="fab"
      direction="right"
      open-on-hover="hover"
      transition="scale-transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        small
        fab
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false,
    fling: false,
    tabs: null,
  }),

  computed: {
    activeFab () {
      switch (this.tabs) {
        case 'one': return { 'class': 'purple', icon: 'account_circle' };
        case 'two': return { 'class': 'red', icon: 'edit' };
        case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' };
        default: return {};
      }
    }
  },
};
</script>


<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
