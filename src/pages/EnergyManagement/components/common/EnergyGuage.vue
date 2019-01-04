<template>
<div
  ref="chart"
  :style="{ height: height }"
>
</div>
</template>

<script>
const echarts = window.echarts || null;

export default {
  props: {
    height: { type: String, default: '170px' },
    value: { type: Number, default: 0 },
    max: { type: Number, default: 10000000 },
    min: { type: Number, default: 0 }
  },
  data () {
    return {
      chart: null,
      totalEnergyUsage: 0
    };
  },
  computed: {
    totalEnergyUsageText () {
      let t = this.totalEnergyUsage;
      return t >= 100000 ? (t / 1000000).toFixed(2) + ' M·KWH' : t.toFixed(2) + ' KWH';
    }
  },
  watch: {
    value: {
      handler (val) {
        this.totalEnergyUsage = val;
        this.updateChart();
      },
      immediate: false
    }
  },
  mounted () {
    if (echarts) {
      this.chart = echarts.init(this.$refs.chart);
      this.updateChart();
    }
  },
  methods: {
    chartOptions (data) {
      return {
        series: [
          {
            type: 'gauge',
            radius: '120%',
            center: ['50%', '65%'],
            min: this.min || 0,
            max: this.max,
            splitNumber: 1, // 刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 18,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: 'rgb(189,249,219)' },
                      { offset: 0.2, color: 'rgb(173,242,202)' },
                      { offset: 0.4, color: 'rgb(205,226,181)' },
                      { offset: 0.6, color: 'rgb(254,191,149)' },
                      { offset: 0.8, color: 'rgb(254,161,142)' },
                      { offset: 1, color: 'rgb(255,173,168)' }
                    ])
                  ]
                ],
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              distance: -50,
              padding: [20, 0, 0, 0],
              formatter: function (value) {
                return `${value / 1000000} M·KWH`;
              }
            },
            axisTick: {
              show: false
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, 40],
              color: '#2f4574',
              formatter: params => {
                return this.totalEnergyUsageText;
              },
              textStyle: {
                fontSize: 14
              }
            },
            data: [
              // name: "当前用户总数",
              { value: data }
            ]
          }
        ]
      };
    },
    updateChart () {
      this.chart.setOption(this.chartOptions(this.totalEnergyUsage));
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>
