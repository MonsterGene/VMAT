<template>
<div :style="style">
  <v-select
    v-model="select"
    :items="options"
    item-text="text"
    item-value="value"
    label="主体单元："
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
    event: 'body-change',
    prop: 'body'
  },
  props: {
    bodyData: { type: Array },
    body: {
      type: String,
      validator (val) {
        return ['bu', 'floor'].indexOf(val) > -1;
      }
    }
  },
  data () {
    return {
      style,
      select: this.body || 'floor',
      options: [
        { text: '楼层', value: 'floor' },
        { text: 'BU', value: 'bu' }
      ]
    };
  },
  watch: {
    bodyData: {
      handler (val) {
        if (val) {
          this.options = val;
        }
      },
      immediate: true
    },
    select: {
      handler (val) {
        this.$emit('body-change', val);
      },
      immediate: false
    },
    body: {
      handler (val) {
        this.select = val;
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>