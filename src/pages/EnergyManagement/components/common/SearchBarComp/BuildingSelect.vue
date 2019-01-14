<template>
<div :style="style">
  <v-select
    v-model="buildingList.select"
    :items="buildingList.options"
    item-text="text"
    item-value="value"
    label="楼栋："
    hide-details
    dense
    solo
    menu-props="offset-y"
    style="margin-top: -6px"
  ></v-select>
</div>

</template>

<script>
import style from './formStyle.js';

export default {
  model: {
    event: 'building-change',
    prop: 'building'
  },
  props: {
    buildingData: { type: Array },
    building: { type: String }
  },
  data () {
    return {
      style,
      buildingList: {
        select: this.building || '',
        options: [
          { text: 'E5', value: 'E5' },
          { text: 'E6', value: 'E6' },
          { text: 'D9', value: 'D9' },
          { text: 'D10', value: 'D10' },
          { text: 'F21', value: 'F21' }
        ]
      }
    };
  },
  watch: {
    buildingData: {
      handler (val) {
        if (val) {
          this.buildingList.options = val;
        }
      },
      immediate: true
    },
    'buildingList.select': {
      handler (val) {
        this.$emit('building-change', val);
      },
      immediate: false
    },
    building: {
      handler (val) {
        if (val) {
          this.buildingList.select = val;
        }
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>