<template>
<v-layout row wrap justify-end>
  <v-flex
    v-if="field.indexOf('building') > -1"
    md2
    d-flex
  >
    <v-select
      v-model="buildingList.select"
      :items="buildingList.options"
      item-text="text"
      item-value="value"
      label="楼栋："
      hide-details
      dense
      solo
    ></v-select>
  </v-flex>
  <v-flex
    v-if="field.indexOf('bu') > -1"
    md2
    d-flex
  >
    <v-select
      v-model="buList.select"
      :items="buList.options"
      item-text="text"
      item-value="value"
      label="BU："
      hide-details
      dense
      solo
    ></v-select>
  </v-flex>
  <v-flex
    v-if="field.indexOf('startTime') > -1"
    md2>
    <v-menu
      ref="startTime"
      :close-on-content-click="false"
      v-model="startTime.picker"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="startTime.value"
        label="Start"
        hide-details
        persistent-hint
        solo
        @blur="date = startTime.value"
      ></v-text-field>
      <v-date-picker
        v-model="startTime.value"
        no-title
        @input="startTime.picker = false"
      ></v-date-picker>
    </v-menu>
  </v-flex>
  <v-flex
    v-if="field.indexOf('endTime') > -1"
    md2>
    <v-menu
      ref="endTime"
      :close-on-content-click="false"
      v-model="endTime.picker"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="endTime.value"
        label="End"
        persistent-hint
        hide-details
        @blur="date = endTime.value"
        solo
      ></v-text-field>
      <v-date-picker
        v-model="endTime.value"
        no-title
        @input="endTime.picker = false"
      ></v-date-picker>
    </v-menu>
  </v-flex>
  <v-flex
    v-if="field.indexOf('shiftType') > -1"
    md2
    d-flex
  >
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
    ></v-select>
  </v-flex>
  <v-flex
    v-if="field.indexOf('typeTime') > -1"
    md2>
    <v-btn-toggle class="btn-group">
      <v-btn flat value="days" class="sub-btn btn-border-r">
        日
      </v-btn>
      <v-btn flat value="months" class="sub-btn btn-border-r">
        月
      </v-btn>
      <v-btn flat value="quater" class="sub-btn btn-border-r">
        季度
      </v-btn>
      <v-btn flat value="year" class="sub-btn">
        年
      </v-btn>
    </v-btn-toggle>
  </v-flex>
</v-layout>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    // building, bu, startTime, endTime, shiftType, typeTime
    field: {
      type: Array,
      default: () => ['building', 'bu', 'startTime', 'endTime', 'shiftType', 'typeTime']
    }
  },
  data () {
    return {
      buildingList: {
        select: 'E5',
        options: [
          { text: 'E5', value: 'E5' },
          { text: 'D10', value: 'E5' }
        ]
      },
      buList: {
        select: 'CSD',
        options: [
          { text: 'MFG6', value: 'MFG6' },
          { text: 'CSD', value: 'CSD' }
        ]
      },
      startTime: {
        picker: false,
        value: moment().format('YYYY-MM-01')
      },
      endTime: {
        picker: false,
        value: moment().format('YYYY-MM-DD')
      },
      shiftType: {
        select: 'daily',
        options: [
          { text: '白班', value: 'daily' },
          { text: '晚班', value: 'night' }
        ]
      }
    };
  },
  computed: {
    formModel () {
      console.log(this.buList.select);
      return {
        building: this.buildingList.select,
        bu: this.buList.select,
        startTime: this.startTime.value,
        endTime: this.endTime.value,
        shiftType: this.shiftType.select
      };
    }
  },
  watch: {
    formModel: {
      handler (val) {
        this.$emit('condition-change', val);
      },
      immediate: true
    }
  }
};
</script>

<style lang='stylus' scoped>
.btn-group
  height 48px
  padding 0 5px
  border-radius 50%
</style>