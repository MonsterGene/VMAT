<template>
<div v-if="show" style="font-size: 0">
<v-menu
  ref="startTime"
  v-if="['both', 'start'].indexOf(show) > -1"
  :close-on-content-click="false"
  v-model="startTime.picker"
  :nudge-right="40"
  lazy
  transition="scale-transition"
  offset-y
  :style="menuStyle"
>
  <v-text-field
    slot="activator"
    v-model="startTime.value"
    label="开始时间"
    hide-details
    persistent-hint
    solo
    style="margin-top: -6px"
  ></v-text-field>
  <v-date-picker
    v-model="startTime.value"
    no-title
    @input="startTime.picker = false"
  ></v-date-picker>
</v-menu>
<v-menu
  ref="endTime"
  v-if="['both', 'end'].indexOf(show) > -1"
  :close-on-content-click="false"
  v-model="endTime.picker"
  :nudge-right="40"
  lazy
  transition="scale-transition"
  offset-y
  :style="menuStyle"
>
  <v-text-field
    slot="activator"
    v-model="endTime.value"
    label="结束时间"
    persistent-hint
    hide-details
    solo
    style="margin-top: -6px"
  ></v-text-field>
  <v-date-picker
    v-model="endTime.value"
    no-title
    @input="endTime.picker = false"
  ></v-date-picker>
</v-menu>
</div>
</template>

<script>
import moment from 'moment';
import style from './formStyle.js';

export default {
  model: {
    event: 'change',
    prop: 'dateRange'
  },
  props: {
    show: {
      type: String,
      default: 'both',
      validator: value => {
        return ['both', 'start', 'end'].indexOf(value) > -1;
      }
    },
    dateRange: { type: Object }
  },
  data () {
    return {
      style,
      startTime: {
        picker: false,
        value: this.dateRange && this.dateRange.startTime || ''
      },
      endTime: {
        picker: false,
        value: this.dateRange && this.dateRange.endTime || ''
      },
    };
  },
  computed: {
    menuStyle () {
      return { width: this.show === 'both' ? '50%' : '100%', ...this.style };
    }
  },
  watch: {
    'startTime.value': {
      handler (val) {
        this.$emit('change', { startTime: val, endTime: this.endTime.value });
      },
      immediate: false
    },
    'endTime.value': {
      handler (val) {
        this.$emit('change', { startTime: this.startTime.value, endTime: val });
      },
      immediate: false
    },
    dateRange: {
      handler (val) {
        if (val) {
          if (val.startTime) {
            this.startTime.value = val.startTime;
          }
          if (val.endTime) {
            this.endTime.value = val.endTime;
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>