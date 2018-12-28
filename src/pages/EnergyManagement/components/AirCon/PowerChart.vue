<template>
<div
  ref="chart"
  :style="{width: width, height: height}"
></div>
</template>

<script>
import moment from 'moment';
import { _isArray, _isObject } from '../../../../util/utils';

const echarts = window.echarts || undefined;

export default {
  props: {
    title: { type: String },
    width: { type: String, default: '100%' },
    height: { type: String, default: '150px' },
    legendList: { type: Array },
    /**
     * type:
     * Object   则每个系列固定配置项
     * Function 则遍历每个系列的数据其返回值则为对应 series 的配置信息
     *  */
    seriesConfig: { type: [Object, Function] },
    chartData: { type: [Object, Array], required: true },
    yName: { type: String },
    xName: { type: String },
    colors: { type: [Array, String] },
    bgColor: { type: String },
    wSize: {}
  },
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
      this.chart = echarts.init(this.$refs.chart);
      this.getChartData();
    }
  },
  methods: {
    defineSeries (data) {
      const doSeries = (t, isLeg) => {
        if (typeof this.seriesConfig === 'object') {
          return t.map(v => {
            if (isLeg && typeof this.seriesConfig.datasetIndex === 'undefined') {
              this.seriesConfig.datasetIndex = v;
            }
            return this.seriesConfig;
          });
        } else if (typeof this.seriesConfig === 'function') {
          return t.map(this.seriesConfig);
        } else {
          return t.map(v => {
            if (isLeg) {
              return {
                type: 'line',
                datasetIndex: v
              };
            } else {
              return { type: 'line' };
            }
          });
        }
      };
      if (this.legendList) {
        let t = Array(this.legendList.length).fill(0);
        const forSeries = a => {
          a.forEach((item, index) => {
            let i = this.legendList.indexOf(item[0]);
            a[index] = i;
          });
          a = a.filter(v => v !== -1);
          return a;
        };
        if (_isArray(data)) {
          if (_isArray(data[0])) {
            t = forSeries(data.filter((v, i) => i !== 0));
            return this.doSeries(t, true);
          } else {
            t = forSeries(data.map(v => Object.keys(v)[0]));
            return this.doSeries(t, true);
          }
        } else {
          t = forSeries(Object.keys(data).filter((v, i) => i !== 0));
          return this.doSeries(t, true);
        }
      } else {
        let t;
        if (_isArray(data)) {
          if (_isArray(data[0])) {
            t = Array(data[0].length - 1).fill(0);
          } else {
            t = Array(Object.keys(data[0].length - 1)).fill(0);
          }
          return doSeries(t);
        } else if (_isObject(data)) {
          t = Array(Object.keys(data).length - 1).fill(0);
          return doSeries(t);
        }
      }
    },
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
        dataset: {},
        legend: {
          show: true,
          top: '40',
          right: '5%'
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          top: 80,
          left: '5%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          name: this.xName || '',
          axisLabel: {
            show: true
          }
        }],
        yAxis: [{
          type: 'value',
          name: this.yName || ''
        }],
        series: [],
      };
      if (this.colors) {
        chartOpts.color = this.colors;
      }
      if (this.bgColor) {
        chartOpts.backgroundColor = this.bgColor;
      }
      chartOpts.series = this.defineSeries(data);
      chartOpts.dataset.source = data;
      return chartOpts;
    },
    getChartData () {
      if (this.chartData) {
        if (typeof this.chartData === 'boolean') return;
        const chartOption = this.chartOptions(this.chartData);
        this.chart.setOption(chartOption);
        return;
      }
    }
  }
};
</script>
