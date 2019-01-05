<template>
<v-list-tile
  :active-class="$vuetify.dark && 'primary--text text--lighten-5' || 'primary--text'"
  ripple="ripple">
  <v-list-tile-content>
    <v-list-tile-title>{{ title }}</v-list-tile-title>
  </v-list-tile-content>
</v-list-tile>
</template>

<script>
export default {
  props: ['title']
};
</script>
