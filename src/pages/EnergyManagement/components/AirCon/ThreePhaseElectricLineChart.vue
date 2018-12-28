<template>
<div
  ref="chart"
  :style="{width: width, height: height}"
></div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
const echarts = window.echarts || null;

export default {
  props: {
    title: { type: String, default: '' },
    width: { type: String, default: '100%' },
    height: { type: String, default: '150px' },
    yName: { type: String },
    xName: { type: String },
    chartData: { type: [Object, Array], required: true }
  },
  data () {
    return {
    };
  },
  watch: {
    chartData: {
      handler () {
        this.renderChart();
      },
      immediate: true
    },
    width () {
      this.chartResize();
    },
    height () {
      this.chartResize();
    }
  },
  mounted () {
    if (echarts) {
      this.chart = echarts.init(this.$refs.chart);
    }
  },
  methods: {
    chartOptions (data) {
      const copts = {
        title: {
          text: this.title,
          textStyle: {
            color: '#5e5e5e',
            fortSize: 20
          },
          top: 14,
          left: 'center'
        },
        color: [colors.yellow.base, colors.green.base, colors.red.base],
        backgroundColor: '#FFF',
        legend: {
          show: true,
          top: '40',
          right: '5%'
        },
        dataset: { source: null },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 90,
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          name: this.xName || ''
        },
        yAxis: {
          type: 'value',
          name: this.yName || ''
        },
        series: Array(3).fill(0).map(v => ({ type: 'line', stack: 1 }))
      };
      copts.dataset.source = data;
      return copts;
    },
    renderChart () {
      if (this.chartData && Object.keys(this.chartData).length > 0) {
        const chartOpts = this.chartOptions(this.chartData);
        this.chart.setOption(chartOpts);
      }
    },
    chartResize () {
      if (this.chart) {
        this.chart.resize();
      }
    }
  },
};
</script>

<style lang='stylus' scoped>

</style>