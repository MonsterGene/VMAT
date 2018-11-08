<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex v-for="(item, index) in equipment_list" :key="index" lg1 sm2>
      <v-card color="purple" dark>
        <v-card-title class="pb-0">
          <h4>{{ item }}</h4>
        </v-card-title>
        <v-card-text>
          U: 20pcs/h 
          E: 85%
        </v-card-text>
        <v-card-actions>
          <v-btn flat small to="/tipbu-6streams/line-details">Link</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      equipment_list: ['equip 1', 'equip 2', 'equip 3', 'equip 4', 'equip 5', 'equip 6', 'equip 7']
    };
  }
};
</script>

<style lang='stylus' scoped>

</style>