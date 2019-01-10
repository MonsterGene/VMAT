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
import moment from 'moment';

export default {
  model: {
    event: 'time-type-change',
    prop: 'timeType'
  },
  props: {
    timeType: { type: Object }
  },
  data () {
    return {
      type: this.timeType.type || ''
    };
  },
  watch: {
    type: {
      handler (val) {
        const dateRange = {};
        if (val === 'day') {
          dateRange.startTime = moment().format('YYYY-MM-DD');
          dateRange.endTime = moment().format('YYYY-MM-DD');
        }
        if (val === 'month') {
          dateRange.startTime = moment().format('YYYY-MM-01');
          dateRange.endTime = moment().format('YYYY-MM-DD');
        }
        if (val === 'quater') {
          dateRange.startTime = moment().startOf('quarter').format('YYYY-MM-DD');
          dateRange.endTime = moment().format('YYYY-MM-DD');
        }
        if (val === 'year') {
          dateRange.startTime = moment().format('YYYY-01-01');
          dateRange.endTime = moment().format('YYYY-MM-DD');
        }
        this.$emit('time-type-change', { type: val, dateRange });
      },
      immediate: false
    },
    timeType: {
      handler (val) {
        if (val) {
          this.type = val.type;
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