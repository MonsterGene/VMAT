<template>
<v-list-tile
  :active-class="$vuetify.dark && 'primary--text text--lighten-5' || 'primary--text'"
  :to="!item.href ? { name: item.name, path: item.path } : null"
  :href="item.href"
  ripple="ripple"
  :disabled="item.disabled"
  :target="item.target"
  rel="noopener"
  :key="item.name"
>
  <v-list-tile-action v-if="item.icon">
    <v-icon>{{ item.icon }}</v-icon>
  </v-list-tile-action>
  <v-list-tile-content>
    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
  </v-list-tile-content>
  <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
  <v-list-tile-action v-if="item.action">
    <v-icon :class="[item.actionClass || 'success--text']">{{ item.action }}</v-icon>
  </v-list-tile-action>
  <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
</v-list-tile>
</template>

<script>
export default {
  props: [
    'item'
  ]
};
</script>
