<template>
<div
  ref="chart"
  :style="{width: width, height: height}"
></div>
</template>

<script>
import moment from 'moment';
import { homeApi } from '../../api';
import { energyManageMixin } from '../../../../util/mixins/globalMixins';

const echarts = window.echarts || undefined;

export default {
  mixins: [energyManageMixin],
  props: ['title', 'height', 'width', 'wSize'],
  data () {
    return {};
  },
  watch: {
    wSize (s) {
      this.chart.resize();
    }
  },
  mounted () {
    if (echarts) {
      // console.log(this.$refs.chart);
      this.chart = echarts.init(this.$refs.chart);
      this.getChartData();
    }
  },
  methods: {
    chartOptions (data) {
      const chartOpts = {
        title: {
          text: this.title,
          textStyle: {
            color: '#5e5e5e',
            fortSize: 20
          },
          top: 14,
          left: 'center'
        },
        dataset: { source: null },
        color: '#4e7af3',
        backgroundColor: '#FFF',
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          top: 80,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          name: '能耗（KWH）'
        }],
        series: [],
        
      };
      const chartData = {};
      chartData['日期'] = Object.keys(data).sort();
      chartData['能耗'] = chartData['日期'].map(date => {
        return Number(data[date]);
      });
      chartData['日期'] = chartData['日期'].map(date => moment(date).format('MM月DD日'));
      chartOpts.dataset.source = chartData;
      const defaultSeries = {
        type: 'line',
        symbolSize: 6
      };
      chartOpts.series.push(defaultSeries);
      return chartOpts;
    },
    getChartData () {
      homeApi.chart5Data(this.simpleParseParams({
        startTime: moment().subtract('days', 5).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      })).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        // console.log(data);
        const chartOption = this.chartOptions(data);
        console.log(chartOption);
        this.chart.setOption(chartOption);
      });
    }
  }
};
</script>
