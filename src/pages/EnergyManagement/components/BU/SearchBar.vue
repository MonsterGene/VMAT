<template>
<v-layout row wrap justify-end>
  <v-flex
    style="text-align:right"
    xs12>
    <label class="search-bar-label">楼栋：</label>
    <building-select style="width: 65px;display: inline-block;vertical-align: top" v-model="formModel.building"></building-select>
    <label class="search-bar-label">BU：</label>
    <bu-select @bu-change="buChange" style="width: 90px;display: inline-block;vertical-align: top" v-model="formModel.bu"></bu-select>
    <label class="search-bar-label">楼层：</label>
    <floor-select @floor-change="floorChange" style="width: 90px;display: inline-block;vertical-align: top" v-model="formModel.floor"></floor-select>
    <label class="search-bar-label">时间段：</label>
    <date-range style="width: 240px;display: inline-block;vertical-align: top" v-model="dateRange"></date-range>
    <label class="search-bar-label">班别：</label>
    <shift-type style="width: 90px;display: inline-block;vertical-align: top" v-model="formModel.shiftType"></shift-type>
    <type-time style="display: inline-block;vertical-align: top" v-model="timeType"></type-time>
  </v-flex>
</v-layout>
</template>

<script>
import moment from 'moment';
import BuildingSelect from '../common/SearchBarComp/BuildingSelect.vue';
import BuSelect from '../common/SearchBarComp/BuSelect.vue';
import FloorSelect from '../common/SearchBarComp/FloorSelect.vue';
import DateRange from '../common/SearchBarComp/DateRange.vue';
import ShiftType from '../common/SearchBarComp/ShiftType.vue';
import TypeTime from '../common/SearchBarComp/TypeTime.vue';

export default {
  components: {
    BuildingSelect,
    BuSelect,
    FloorSelect,
    DateRange,
    ShiftType,
    TypeTime
  },
  data () {
    return {
      formModel: {
        building: 'E5',
        bu: '',
        floor: '',
        startTime: '',
        endTime: '',
        shiftType: '',
      },
      dateRange: {
        startTime: moment().format('YYYY-MM-01'),
        endTime: moment().format('YYYY-MM-DD')
      },
      timeType: { type: 'month' }
    };
  },
  computed: {
    fmodel () {
      return {
        building: this.formModel.building,
        bu: this.formModel.bu,
        floor: this.formModel.floor,
        startTime: this.formModel.startTime,
        endTime: this.formModel.endTime,
        shiftType: this.formModel.shiftType
      };
    }
  },
  watch: {
    timeType (val) {
      this.dateRange = val.dateRange;
    },
    dateRange: {
      handler (val) {
        console.log(val);
        if (val) {
          if (val.startTime) {
            this.formModel.startTime = val.startTime;
          }
          if (val.endTime) {
            this.formModel.endTime = val.endTime;
          }
        }
      },
      immediate: true
    },
    fmodel: {
      handler (val) {
        this.$emit('condition-change', val);
      },
      immediate: true
    }
  },
  methods: {
    buChange (bu) {
      console.log(bu);
      if (bu) {
        this.formModel.floor = '';
      }
    },
    floorChange (floor) {
      console.log(floor);
      if (floor) {
        this.formModel.bu = '';
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
.search-bar-label
  line-height: 36px;
  height: 36px;
  font-size: 16px;
</style>