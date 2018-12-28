<template>
<div ref="chart" :style="{width: width, height: height}"></div>
</template>

<script>
import moment from 'moment';
import { homeApi } from '../../api';
import { energyManageMixin } from '../../../../util/mixins/globalMixins';

const echarts = window.echarts || undefined;

export default {
  mixins: [energyManageMixin],
  props: ['height', 'width', 'title', 'wSize', 'chartData'],
  data () {
    return {};
  },
  watch: {
    wSize (s) {
      this.chart.resize();
    },
    chartData (d) {
      this.getChartData();
    }
  },
  mounted () {
    if (echarts) {
      console.log(this.$refs.chart);
      this.chart = echarts.init(this.$refs.chart);
      this.getChartData();
    }
  },
  methods: {
    chartOptions (data) {
      const cData = {};
      const typeSort = ['动力', '照明', '空调主机', '空调风柜'];
      cData['类型'] = typeSort;
      cData['能耗'] = typeSort.map(key => data[key]);
      console.log(cData);
      const chartOpts = {
        dataset: { source: cData },
        title: {
          text: this.title,
          x: 'center',
          top: 14,
          textStyle: {
            fontSize: 20,
            color: '#5e5e5e'
          }
        },
        color: ['rgb(58,192,169)', 'rgb(112,148,245)', 'rgb(178,189,211)', 'rgb(228,228,228)'],
        backgroundColor: '#fff',
        legend: {
          show: true,
          bottom: '3%'
        },
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: '{b} : {c} KWH({d}%)'
        },
        series: [{
          name: '',
          type: 'pie',
          radius: '45%',
          center: ['50%', '50%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: { show: true },
          label: {
            show: true,
            color: '#5e5e5e',
            formatter: '{b} {d}%'
          }
        }]
      };
      return chartOpts;
    },
    getChartData () {
      if (this.chartData) {
        if (typeof this.chartData === 'boolean') return;
        const chartOpts = this.chartOptions(this.chartData);
        this.chart.setOption(chartOpts);
        return;
      }
      homeApi.homeFistChart(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data;
          const chartOption = this.chartOptions(data);
          this.chart.setOption(chartOption);
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>
