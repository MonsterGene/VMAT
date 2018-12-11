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
      <v-widget :title="'運行時間('+ $route.params.stationName +')'" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content">
            <e-chart
            ref="yunxingshijian"
            :path-option="[
              ['dataset.source', dataset.dailyData2],
              ['color', ['#454998', '#914d97', '#dc4b98', '#edab82']],
              ['legend.show', true],
              ['legend.selected', {
                'Run 2': false, 'Standy 2': false, 'Error 2': false, 'Unready 2': false,
                'Run 2': false, 'Standy 2': false, 'Error 2': false, 'Unready 2': false,
                'Run 3': false, 'Standy 3': false, 'Error 3': false, 'Unready 3': false
              }],
              ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.show', true],
              ['yAxis.axisLine.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],

              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top'],
              
              ['series[1].type', 'bar'],
              ['series[1].label.show', true],
              ['series[1].smooth', true],
              ['series[1].stack', 1],
              ['series[1].label.position', 'top'],

              ['series[2].type', 'bar'],
              ['series[2].label.show', true],
              ['series[2].smooth', true],
              ['series[2].stack', 1],
              ['series[2].label.position', 'top'],

              ['series[3].smooth', true],
              ['series[3].type', 'bar'],
              ['series[3].label.show', true],
              ['series[3].stack', 1],
              ['series[3].label.position', 'top'],

              ['series[4].smooth', true],
              ['series[4].type', 'bar'],
              ['series[4].label.show', true],
              ['series[4].stack', 2],
              ['series[4].label.position', 'top'],

              ['series[5].smooth', true],
              ['series[5].type', 'bar'],
              ['series[5].label.show', true],
              ['series[5].stack', 2],
              ['series[5].label.position', 'top'],
          
              ['series[6].smooth', true],
              ['series[6].type', 'bar'],
              ['series[6].label.show', true],
              ['series[6].stack', 2],
              ['series[6].label.position', 'top'],
          
              ['series[7].smooth', true],
              ['series[7].type', 'bar'],
              ['series[7].label.show', true],
              ['series[7].stack', 2],
              ['series[7].label.position', 'top'],
          
              ['series[8].smooth', true],
              ['series[8].type', 'bar'],
              ['series[8].label.show', true],
              ['series[8].stack', 3],
              ['series[8].label.position', 'top'],
          
              ['series[9].smooth', true],
              ['series[9].type', 'bar'],
              ['series[9].label.show', true],
              ['series[9].stack', 3],
              ['series[9].label.position', 'top'],
          
              ['series[10].smooth', true],
              ['series[10].type', 'bar'],
              ['series[10].label.show', true],
              ['series[10].stack', 3],
              ['series[10].label.position', 'top'],
          
              ['series[11].smooth', true],
              ['series[11].type', 'bar'],
              ['series[11].label.show', true],
              ['series[11].stack', 3],
              ['series[11].label.position', 'top'],
          
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
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
      station-id=""
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
      console.log(evt);
      this.subError.date = evt.date;
      this.subError.showLevel = 1;
    },
    subErrorClick (evt, level) {
      console.log(evt, level);
      this.subError.showLevel = ++level;
      console.log(this.subError.showLevel);
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>