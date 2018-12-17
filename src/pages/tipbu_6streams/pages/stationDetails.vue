<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与稼动率分析（单站 - ' + $route.params.stationName + '- 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        @chart-click="utilOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与稼动率分析（单站 - ' + $route.params.stationName + '- 每日趋势 -'+ utilOutputByHour.date +'）'"
        :date="utilOutputByHour.date"
        :line-id="utilOutputByHour.lineId"
        :station-id="utilOutputByHour.stationId"
      ></utilization-rate-and-output-by-hour>
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <run-time :station-name="$route.params.stationName"></run-time>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <error-frequency-and-time-by-day
        ref="yichangCishuShijian"
        :title="'异常次数/时间分析（'+ $route.params.stationName +'）'"
        :start-date="errorFreqAndTimeByDay.startDate"
        :end-date="errorFreqAndTimeByDay.endDate"
        :line-id="errorFreqAndTimeByDay.lineId"
        :station-id="errorFreqAndTimeByDay.stationId"
        @chart-click="errorFreqAndTimeByDayClick"
      ></error-frequency-and-time-by-day>
    </v-flex>
  </v-layout>

  <sub-freq-time-by-type
    v-if="subError.showLevel"
    :date="subError.date"
    :line-id="subError.lineId"
    :station-id="subError.stationId"
    @chart-click="subErrorByDayType = $event.name;subError.showLevel = 2"
  ></sub-freq-time-by-type>
  <sub-freq-time-by-day
    v-if="subError.showLevel >= 2"
    :type="subErrorByDayType"
    :line-id="subError.lineId"
    :station-id="subError.stationId"
    @chart-click="subErrorByHourDate = $event.name;subError.showLevel = 3"
  ></sub-freq-time-by-day>
  <v-flex xs12 v-if="subError.showLevel >= 2">
    <error-solution
      :station-id="subError.stationId"
      :error-type="subErrorByDayType"
    ></error-solution>
  </v-flex>
  <sub-freq-time-by-hour
    v-if="subError.showLevel >= 3"
    :date="subErrorByHourDate"
    :type="subErrorByDayType"
    :line-id="subError.lineId"
    :station-id="subError.stationId"
  ></sub-freq-time-by-hour>
  
</v-container>
</template>

<script>
import moment from 'moment';
import API from '../api/chart';
import Material from 'vuetify/es5/util/colors';
import OutputAnalysis from '../components/outputAnalysis.vue';
import ErrorAnalysis from '../components/errorAnalysis.vue';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import UtilizationRateAndOutputByDay from '../components/UtilizationRateAndOutputByDay.vue';
import UtilizationRateAndOutputByHour from '../components/UtilizationRateAndOutputByHour.vue';
import RunTime from '../components/RunTime.vue';
import ErrorFrequencyAndTimeByDay from '../components/ErrorFrequencyAndTimeByDay.vue';
import subFreqTimeByType from '../components/SubFreqAndTimeByType.vue';
import SubFreqTimeByDay from '../components/SubFreqAndTimeByDay.vue';
import ErrorSolution from '../components/ErrorSolution.vue';
import SubFreqTimeByHour from '../components/SubFreqAndTimeByHour.vue';

export default {
  components: {
    OutputAnalysis,
    ErrorAnalysis,
    EChart,
    VWidget,
    UtilizationRateAndOutputByDay,
    UtilizationRateAndOutputByHour,
    RunTime,
    ErrorFrequencyAndTimeByDay,
    subFreqTimeByType,
    SubFreqTimeByDay,
    ErrorSolution,
    SubFreqTimeByHour
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
      errorFreqAndTimeByDay: {
        startDate: moment().subtract('months', 1).format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        lineId,
        stationId
      },
      subError: {
        showLevel: 0,
        date: moment().format('YYYY-MM-DD'),
        lineId,
        stationId 
      },
      subErrorByDayType: '',
      subErrorByHourDate: '',
      dataset: {
        ...API
      },
      color: Material,

    };
  },
  // mounted () {},
  methods: {
    utilOutputByDayClick (evt) {
      this.utilOutputByHour.date = evt.date;
    },
    errorFreqAndTimeByDayClick (evt) {
      this.subError.date = evt.date;
      this.subError.showLevel = 1;
    },
    subErrorClick (evt, level) {
      this.subError.showLevel = ++level;
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>