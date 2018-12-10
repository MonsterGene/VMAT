<template>
<v-layout row>
  <v-flex xs6>
    <v-widget :title="'机故次数走势（'+ type +'）'" :content-bg="$vuetify.theme.primary">
      <div slot="widget-content">
        <e-chart
          ref="frequencyChart"
          :path-option="frequencyChartOption"
          @chart-click="$emit('chart-click', $event, type)"
          height="400px"
          width="100%"
          >
        </e-chart>
      </div>
    </v-widget>
  </v-flex>
  <v-flex xs6>
    <v-widget :title="'机故时间走势（'+ type +'）'" :content-bg="$vuetify.theme.primary">
      <div slot="widget-content">
        <e-chart 
          ref="timeChart"
          :path-option="timeChartOption"
          @chart-click="$emit('chart-click', $event, type)"
          height="400px"
          width="100%"
          >
        </e-chart>
      </div>
    </v-widget>
  </v-flex>
</v-layout>
</template>

<script>
import moment from 'moment';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import yAxisConf from './chartYStyle';
import commChartOpt from './commChartOpt';
import { stationApi } from '../api';
import axios from 'axios';


export default {
  components: { EChart, VWidget },
  props: ['type', 'lineId', 'stationId'],
  data () {
    return {
      startDate: moment().subtract('days', 5).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      frequencyChartData: { date: [] },
      timeChartData: { date: [] },
    };
  },
  computed: {
    frequencyChartOption () {
      return [
        ['dataset.source', this.frequencyChartData],
        ['color', ['#73fb79']],
        ['yAxis', yAxisConf],
        ['series[0].type', 'line'],
        ...commChartOpt
      ];
    },
    timeChartOption () {
      return [
        ['dataset.source', this.timeChartData],
        ['color', ['#bfbfbf']],
        ['yAxis', yAxisConf],
        ['series[0].type', 'bar'],
        ...commChartOpt
      ];
    }
  },
  watch: {
    type: {
      handler (val) {
        this.getChartData();
      },
      immediate: true
    }
  },
  methods: {
    getChartData () {
      const reqFreqAndTime = stationApi.getErrorFrequency.byDay({
        startDate: this.startDate,
        endDate: this.endDate,
        lineID: this.lineId,
        areaID: this.stationId,
        errorName: this.type
      }).then(res => {
        const data = res.data;
        console.log(data);
        if (data.success) {
          this.frequencyChartData = {
            date: data.data.date,
            frequency: data.data.frequency
          };
          this.timeChartData = {
            date: data.data.date,
            time: data.data.time
          };
          this.$nextTick(() => {
            this.$refs.frequencyChart.update();
            this.$refs.timeChart.update();
          });
        } else {
          console.log('获取异常类型次数和时间失败！');
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>