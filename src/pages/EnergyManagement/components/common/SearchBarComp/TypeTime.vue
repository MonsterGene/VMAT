<template>
<v-btn-toggle v-model="type" class="btn-group">
  <v-btn flat value="day" class="sub-btn" :class="{active: type === 'day'}">
    日
  </v-btn>
  <v-btn flat value="month" class="sub-btn" :class="{active: type === 'month'}">
    月
  </v-btn>
  <v-btn flat value="quater" class="sub-btn" :class="{active: type === 'quater'}">
    季度
  </v-btn>
  <v-btn flat value="year" class="sub-btn" :class="{active: type === 'year'}">
    年
  </v-btn>
</v-btn-toggle>
</template>

<script>
export default {
  model: {
    event: 'time-type-change',
    prop: 'timeType'
  },
  props: {
    timeType: { type: String }
  },
  data () {
    return {
      type: this.timeType || ''
    };
  },
  watch: {
    type: {
      handler (val) {
        console.log(val);
        this.$emit('time-type-change', val);
      },
      immediate: false
    },
    timeType: {
      handler (val) {
        if (val) {
          this.type = val;
        }
      },
      immediate: false
    }
  }
};
</script>

<style lang='stylus' scoped>
.btn-group
  height 36px
  border-radius 8px
  border 1px solid #7f9ef4
  overflow hidden
  font-size 0
  .sub-btn
    height 100%
    border-left 1px solid #7f9ef4
    color #7f9ef4
    &.active
      color white
      background: #448aff
</style>