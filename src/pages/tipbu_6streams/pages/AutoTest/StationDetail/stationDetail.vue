<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与稼动率分析（单站 - 測試 - 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        @chart-click="utilOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与稼动率分析（单站 - 測試 - 每日趋势 -'+ utilOutputByHour.date +'）'"
        :date="utilOutputByHour.date"
        :line-id="utilOutputByHour.lineId"
        :station-id="utilOutputByHour.stationId"
      ></utilization-rate-and-output-by-hour>
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <run-time-test
        :station-name="runtime.stationName"
        :line-id="runtime.lineId"
        :station-id="runtime.stationId"></run-time-test>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import API from '../../../api/chart';
import Material from 'vuetify/es5/util/colors';
import OutputAnalysis from '../../../components/outputAnalysis.vue';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import UtilizationRateAndOutputByDay from '../../../components/UtilizationRateAndOutputByDay.vue';
import UtilizationRateAndOutputByHour from '../../../components/UtilizationRateAndOutputByHour.vue';
import RunTimeTest from '../../../components/RunTimeTest.vue';
export default{
  components: {
    OutputAnalysis,
    EChart,
    VWidget,
    UtilizationRateAndOutputByDay,
    UtilizationRateAndOutputByHour,
    RunTimeTest,
  },
  data () {
    console.log(API.dailyCishuShijian);
    const lineId = this.$route.query.l;
    const stationId = this.$route.query.s;
    return {
      utilOutputByHour: {
        date: moment().format('YYYY-MM-DD'),
        lineId,
        stationId
      },
      runtime: {
        stationName: '测试工站',
        lineId,
        stationId
      },
      dataset: {
        ...API
      },
      color: Material,
    };
  },
  methods: {
    utilOutputByDayClick (evt) {
      this.utilOutputByHour.date = evt.date;
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>