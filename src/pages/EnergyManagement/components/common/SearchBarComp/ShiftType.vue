<template>
<div :style="style">
  <v-select
    height="40px"
    v-model="shiftType.select"
    :items="shiftType.options"
    item-text="text"
    item-value="value"
    label="班别："
    hide-details
    dense
    solo
    style="margin-top: -6px"
  ></v-select>
</div>

</template>

<script>
import style from './formStyle.js';

export default {
  model: {
    event: 'shift-change',
    prop: 'shift'
  },
  props: ['shift'],
  data () {
    return {
      style,
      shiftType: {
        select: this.shift || '',
        options: [
          { text: '全天', value: '' },
          { text: '白班', value: 'daily' },
          { text: '晚班', value: 'night' }
        ]
      }
    };
  },
  watch: {
    'shiftType.select': {
      handler (val) {
        this.$emit('shift-change', val);
      },
      immediate: false
    },
    shift: {
      handler (val) {
        if (val) {
          this.shiftType.select = val;
        }
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>