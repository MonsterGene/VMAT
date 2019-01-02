<template>
<v-layout row>
  <v-flex xs6>
    <v-widget :title="'机故次数走势（'+ date +' '+ type +'）'" :content-bg="$vuetify.theme.primary" :header-bg="$vuetify.theme.primary">
      <div slot="widget-content">
        <e-chart
          ref="frequencyChart"
          :path-option="frequencyChartOption"
          height="400px"
          width="100%"
          >
        </e-chart>   
      </div>
    </v-widget>
  </v-flex>
  <v-flex xs6>
      <v-widget :title="'机故时间走势('+ date +' '+ type +')'" :content-bg="$vuetify.theme.primary" :header-bg="$vuetify.theme.primary">
        <div slot="widget-content">
          <e-chart
            ref="timeChart"
            :path-option="timeChartOption"
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
import commChartOpt from './commChartOpt';
import yAxisConf from './chartYStyle';
import { stationApi } from '../api';

export default {
  components: {
    EChart,
    VWidget
  },
  props: ['date', 'type', 'lineId', 'stationId'],
  data () {
    return {
      frequencyChartData: { hour: [] },
      timeChartData: { hour: [] },
      loadingStyle: {
        textColor: '#CCC',
        maskColor: 'rgba(255, 255, 255, 0.1)'
      }
    };
  },
  computed: {
    frequencyChartOption () {
      return [
        ['dataset.source', this.frequencyChartData],
        ['color', ['#73fb79']],
        ['series[0].type', 'line'],
        ['yAxis', yAxisConf],
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
    },
  },
  watch: {
    date: {
      handler (val) {
        this.$nextTick(() => {
          this.showFreqChartLoading();
          this.showTimeChartLoading();
        });
        this.getChartData();
      },
      immediate: true
    }
  },
  methods: {
    showFreqChartLoading () {
      this.$refs.frequencyChart.chartInstance.showLoading(this.loadingStyle);
    },
    showTimeChartLoading () {
      this.$refs.timeChart.chartInstance.showLoading(this.loadingStyle);
    },
    hideFreqChartLoading () {
      this.$refs.frequencyChart.chartInstance.hideLoading();
    },
    hideTimeChartLoading () {
      this.$refs.timeChart.chartInstance.hideLoading();
    },
    getChartData () {
      const reqFreqAndTime = stationApi.getErrorFrequency.byHour({
        date: this.date,
        errorType: this.type,
        lineID: this.lineId,
        areaID: this.stationId
      }).then(res => {
        const data = res.data;
        console.log(data);
        if (data.success) {
          this.frequencyChartData = {
            hour: data.data.hour,
            frequency: data.data.frequency
          };
          this.timeChartData = {
            hour: data.data.hour,
            time: data.data.time
          };
          this.$nextTick(() => {
            this.hideFreqChartLoading();
            this.hideTimeChartLoading();
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