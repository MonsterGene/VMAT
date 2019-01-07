<template>
<v-layout row wrap justify-end>
  <v-flex
    md2
    d-flex
  >
    <v-select
      v-model="buildingList.select"
      :items="buildingList.options"
      :hint="`${buildingList.select.text}, ${buildingList.select.value}`"
      item-text="text"
      item-value="value"
      label="楼栋："
      dense
    ></v-select>
  </v-flex>
  <v-flex
    md2
    d-flex
  >
    <v-select
      v-model="buList.select"
      :items="buList.options"
      :hint="`${buList.select.text}, ${buList.select.value}`"
      item-text="text"
      item-value="value"
      label="BU："
      dense
    ></v-select>
  </v-flex>
  <v-flex md2>
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
        persistent-hint
        prepend-icon="event"
        @blur="date = startTime.value"
      ></v-text-field>
      <v-date-picker
        v-model="startTime.value"
        no-title
        @input="startTime.picker = false"
      ></v-date-picker>
    </v-menu>
  </v-flex>
  <v-flex md2>
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
        prepend-icon="event"
        @blur="date = endTime.value"
      ></v-text-field>
      <v-date-picker
        v-model="endTime.value"
        no-title
        @input="endTime.value = false"
      ></v-date-picker>
    </v-menu>
  </v-flex>
  <v-flex
    md2
    d-flex
  >
    <v-select
      v-model="shiftType.select"
      :items="shiftType.options"
      :hint="`${shiftType.select.text}, ${shiftType.select.value}`"
      item-text="text"
      item-value="value"
      label="班别："
      dense
    ></v-select>
  </v-flex>
</v-layout>
</template>

<script>
import moment from 'moment';

export default {
  data () {
    return {
      buildingList: {
        select: { text: 'E5', value: 'E5' },
        options: [
          { text: 'E5', value: 'E5' },
          { text: 'D10', value: 'E5' }
        ]
      },
      buList: {
        select: { text: 'MFG6', value: 'MFG6' },
        options: [
          { text: 'MFG6', value: 'MFG6' },
          { text: 'CSD', value: 'CSD' }
        ]
      },
      startTime: {
        picker: false,
        value: moment().subtract('days', 30).format('YYYY-MM-DD')
      },
      endTime: {
        picker: false,
        value: moment().format('YYYY-MM-DD')
      },
      shiftType: {
        select: { text: '白班', value: 'daily' },
        options: [
          { text: '白班', value: 'daily' },
          { text: '晚班', value: 'night' }
        ]
      }
    };
  },
  computed: {
    formModel () {
      return {
        building: this.buildingList.select.value,
        bu: this.buList.select.value,
        startTime: this.startTime.value,
        endTime: this.endTime.value,
        shiftType: this.shiftType.select.value
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

</style>