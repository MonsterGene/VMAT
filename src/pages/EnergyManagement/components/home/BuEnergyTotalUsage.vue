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
        color: ['#4e7af3'],
        backgroundColor: '#FFF',
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0
            }
          },
          formatter: '{b} : {c} KWH'
        },
        legend: {
          show: true,
          left: 'right',
          top: 48
        },
        grid: {
          top: 100,
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          name: 'BU',
          gridIndex: 0,
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          name: '耗能（KWH）',
          gridIndex: 0,
          min: 0,
        },
        {
          type: 'value',
          gridIndex: 0,
          min: 0,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },  
        }
        ],
        series: [],
      };

      const chartData = {
        'BU': [],
        '能耗': []
      };
      data.forEach(item => {
        console.log(item);
        const [key, value] = Object.entries(item)[0];
        chartData['BU'].push(key);
        chartData['能耗'].push(value);
      });
      console.log(chartData);
      chartOpts.dataset.source = chartData;
      const defaultSeries = {
        type: 'bar',
        barWidth: '30%',
        xAxisIndex: 0,
        yAxisIndex: 0,
        // itemStyle: {
        //   normal: {
        //     // barBorderRadius: 30,
        //     color: new echarts.graphic.LinearGradient(
        //       0, 0, 0, 1, [{
        //         offset: 0,
        //         color: '#ff6c69'
        //       },
        //       {
        //         offset: 0.5,
        //         color: '#ffbc91'
        //       },
        //       {
        //         offset: 1,
        //         color: '#fffb99'
        //       }
        //       ]
        //     )
        //   },
        // },
      };
      chartOpts.series.push(defaultSeries);
      return chartOpts;
    },
    getChartData () {
      homeApi.chart3Data(this.simpleParseParams({
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
