<template>
<div :style="style">
  <v-select
    v-model="buList.select"
    :items="buList.options"
    item-text="text"
    item-value="value"
    label="BU："
    hide-details
    dense
    solo
    offset-y
    style="margin-top: -6px"
  ></v-select>
</div>

</template>

<script>
import style from './formStyle.js';

export default {
  model: {
    event: 'bu-change',
    prop: 'bu'
  },
  props: {
    buData: { type: Array },
    bu: { type: String }
  },
  data () {
    return {
      style,
      buList: {
        select: this.bu || '',
        options: [
          { text: 'MFG6', value: 'MFG6' },
          { text: 'CSD', value: 'CSD' }
        ]
      }
    };
  },
  watch: {
    buData: {
      handler (val) {
        if (val) {
          this.buList.options = val;
        }
      },
      immediate: true
    },
    'buList.select': {
      handler (val) {
        this.$emit('bu-change', val);
      },
      immediate: false
    },
    bu: {
      handler (val) {
        if (val) {
          this.buList.select = val;
        }
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>