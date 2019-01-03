<template>
<div ref="chart" :style="{width: width, height: height}"></div>
</template>

<script>
import moment from 'moment';
import {
  _isArray,
  _isObject
} from '../../util/utils';

const echarts = window.echarts || undefined;

(function () {
  const throttle = function (type, name, obj) {
    obj = obj || window;
    let running = false;
    const func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle('resize', 'optimizedResize');
})();

export default {
  props: {
    title: {
      type: String
    },
    seriesType: {
      type: [String, Array],
      default: 'line',
      validator: function (value) {
        if (typeof value === 'string') {
          return ['line', 'bar'].indexOf(value) !== -1;
        } else if (_isArray(value)) {
          return value.reduce((acc, cur) => {
            if (acc) {
              return ['line', 'bar'].indexOf(cur) !== -1;
            } else {
              return false;
            }
          }, true);
        }
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '150px'
    },
    legendList: {
      type: Array
    },
    grid: {
      type: Object
    },
    /**
     * type:
     * Object   则每个系列固定配置项
     * Function 则遍历每个系列的数据其返回值则为对应 series 的配置信息
     *  */
    seriesConfig: {
      type: [Object, Function]
    },
    datasetSource: {
      type: [Object, Array],
      required: true
    },
    // maxValue: {
    //   type: [Number, Array, String, Function]
    // },
    // minValue: {
    //   type: [Number, Array, String, Function]
    // },
    stack: {
      type: [Boolean]
    },
    yName: {
      type: String
    },
    xName: {
      type: String
    },
    xAxis: { type: [Object, Array] },
    yAxis: { type: [Object, Array] },
    colors: {
      type: [Array, String]
    },
    bgColor: {
      type: String
    },
    // resize delay
    resizeDelay: {
      type: Number,
      default: 450
    },
    customTooltip: {
      type: Object
    }
  },
  data () {
    return {};
  },
  watch: {
    datasetSource (d) {
      this.renderChart();
    }
  },
  mounted () {
    this.init();
    console.log(this.$listeners);
  },
  beforeDestroy () {
    this.clean();
  },
  methods: {
    init () {
      if (echarts) {
        this.chart = echarts.init(this.$refs.chart);
        Object.entries(this.$listeners).forEach(([evtName, handler]) => {
          this.chart.on(evtName, handler);
        });
        window.addEventListener('optimizedResize', this.resize);
        this.renderChart();
      } else {
        console.log('echarts is undefined!');
      }
    },
    defineSeries (data) {
      const doSeries = (t, isLeg) => {
        let series;
        if (typeof this.seriesConfig === 'object') {
          series = t.map(v => this.seriesConfig);
        } else if (typeof this.seriesConfig === 'function') {
          series = t.map(this.seriesConfig);
        } else {
          series = t.map(v => ({
            type: 'line'
          }));
        }
        t.forEach((v, i) => {
          if (isLeg && typeof series[i].datasetIndex === 'undefined') {
            series[i].datasetIndex = 0;
          }
          if (this.stack && typeof series[i].stack === 'undefined') {
            series[i].stack = 1;
          }
          if (this.seriesType && typeof this.seriesType === 'string') {
            series[i].type = this.seriesType;
          } else if (this.seriesType && _isArray(this.seriesType) && this.seriesType.length > 0) {
            series[i].type = this.seriesType[i] || this.seriesType[this.seriesType.length - 1];
          }
        });
        console.log(series);
        return series;
      };
      if (this.legendList) {
        let t = Array(this.legendList.length).fill(0);
        const forSeries = a => {
          console.log(a);
          a.forEach((item, index) => {
            let i = this.legendList.indexOf(item);
            a[index] = i;
          });
          a = a.filter(v => v !== -1);
          console.log(a);
          return a;
        };
        if (_isArray(data)) {
          if (_isArray(data[0])) {
            t = forSeries(data.filter((v, i) => i !== 0));
            return doSeries(t, true);
          } else {
            t = forSeries(Object.keys(data[0]));
            return doSeries(t, true);
          }
        } else {
          t = forSeries(Object.keys(data).filter((v, i) => i !== 0));
          return doSeries(t, true);
        }
      } else {
        let t;
        if (_isArray(data)) {
          if (_isArray(data[0])) {
            t = Array(data[0].length - 1).fill(0);
          } else {
            t = Array(Object.keys(data[0]).length - 1).fill(0);
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
        grid: {
          top: 100,
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
      // if (this.maxValue) {
      //   if (['number', 'string', 'function'].indexOf(typeof this.maxValue) > -1) {
      //     // 默认Y轴为数值轴
      //     chartOpts.yAxis[0].max = this.maxValue;
      //   } else if (_isArray(this.maxValue)) {
      //     this.maxValue.forEach((v, i) => {
      //       if (chartOpts.yAxis[i]) {
      //         chartOpts.yAxis[i].max = v;
      //       }
      //     });
      //   }
      // }
      // if (this.minValue) {
      //   if (['number', 'string', 'function'].indexOf(typeof this.maxValue) > -1) {
      //     // 默认Y轴为数值轴
      //     chartOpts.yAxis[0].min = this.minValue;
      //   } else {
      //     this.minValue.forEach((v, i) => {
      //       if (chartOpts.yAxis[i]) {
      //         chartOpts.yAxis[i].min = v;
      //       }
      //     });
      //   }
      // }
      if (this.xAxis) {
        if (_isArray(this.xAxis)) {
          chartOpts.xAxis = this.xAxis;
        } else if (_isObject(this.xAxis)) {
          chartOpts.xAxis = [this.xAxis];
        } else {
          chartOpts.xAxis = [{
            type: 'category',
            name: this.xName || '',
            axisLabel: {
              show: true
            }
          }];
        }
      }
      if (this.yAxis) {
        if (_isArray(this.yAxis)) {
          chartOpts.yAxis = this.yAxis;
        } else if (_isObject(this.yAxis)) {
          chartOpts.yAxis = [this.yAxis];
        } else {
          chartOpts.yAxis = [{
            type: 'value',
            name: this.yName || '',
            axisLabel: {
              show: true
            }
          }];
        }
      }
      if (this.grid) {
        Object.assign(chartOpts.grid, this.grid);
      }
      if (this.colors) {
        chartOpts.color = this.colors;
      }
      if (this.bgColor) {
        chartOpts.backgroundColor = this.bgColor;
      }
      if (this.customTooltip) {
        chartOpts.tooltip = this.customTooltip;
      }
      chartOpts.series = this.defineSeries(data);
      chartOpts.dataset.source = data;
      return chartOpts;
    },
    renderChart () {
      if (this.datasetSource) {
        if (Object.keys(this.datasetSource).length === 0) return;
        const chartOption = this.chartOptions(this.datasetSource);
        this.chart.setOption(chartOption);
        return;
      }
    },
    resize (e) {
      console.log('resize');
      setTimeout(() => {
        this.chart.resize();
      }, this.resizeDelay);
    },
    clean () {
      window.removeEventListener('resize', this.resize);
      this.chart.clear();
    }
  },
};
</script>
