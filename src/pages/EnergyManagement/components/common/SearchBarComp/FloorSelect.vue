<template>
<div :style="style">
  <v-select
    v-model="floorList.select"
    :items="floorList.options"
    item-text="text"
    item-value="value"
    label="楼层："
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
    event: 'floor-change',
    prop: 'floor'
  },
  props: {
    floorData: { type: Array },
    floor: { type: String }
  },
  data () {
    return {
      style,
      floorList: {
        select: this.floor || '',
        options: [
          { text: '所有', value: '' },
          { text: '1F', value: '1F' },
          { text: '1.5F', value: '1.5F' },
          { text: '2F', value: '2F' },
          { text: '3F', value: '3F' },
          { text: '4F', value: '4F' }
        ]
      }
    };
  },
  watch: {
    floorData: {
      handler (val) {
        if (val) {
          this.floorList.options = val;
        }
      },
      immediate: true
    },
    'floorList.select': {
      handler (val) {
        this.$emit('floor-change', val);
      },
      immediate: false
    },
    floor: {
      handler (val) {
        this.floorList.select = val;
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>