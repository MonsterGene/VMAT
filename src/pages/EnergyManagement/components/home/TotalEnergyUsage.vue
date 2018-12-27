<template>
<v-widget :title="department + ' 电能消耗'" header-bg="blue accent-2" header-dark>
  <div
    slot="widget-content"
    class="first-panel"
  >
    <v-layout row wrap class="first-panel-top">
      <v-flex xs5>
        监测单位 <span class="grey-text">{{ department }}</span>
      </v-flex>
      <v-flex xs7>
        累计电能耗 <span class="grey-text">{{ totalEnergyUsage }}</span>
      </v-flex>
      <v-flex xs5>
        同比升降 <span class="grey-text">{{ YOY }} % <span class="gcem-arrow-up"></span></span>
      </v-flex>
      <v-flex xs7>
        环比升降 <span class="grey-text">{{ MOM }} % <span class="gcem-arrow-down"></span></span>
      </v-flex>
      <v-flex xs12>
        监测点 {{ warchPoint }}
      </v-flex>
      <v-flex xs12>
        采集数据 <span class="grey-text">{{ dataCount }} 个</span>
      </v-flex>
    </v-layout>
    <div
      ref="chart"
      style="height:170px;"
    >
    </div>
  </div>
</v-widget>
</template>

<script>
import { homeApi } from '../../api';
import moment from 'moment';
import VWidget from '../../../../components/VWidget.vue';
import { energyManageMixin } from '../../../../util/mixins/globalMixins';

const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget
  },
  mixins: [energyManageMixin],
  props: ['wSize'],
  data () {
    return {
      department: 'NSD1',
      totalEnergyUsage: '0 KWH',
      YOY: 45,
      MOM: 45,
      warchPoint: 'E5/E6/D9/D10/F21/B3',
      dataCount: 500
    };
  },
  watch: {
    wSize (s) {
      this.chart.resize();
    }
  },
  mounted () {
    if (echarts) {
      this.chart = echarts.init(this.$refs.chart);
      this.getChartData();
    }
  },
  methods: {
    chartOptions (data) {
      const minVal = 0;
      const maxVal = 10;
      return {
        series: [
          {
            type: 'gauge',
            radius: '120%',
            center: ['50%', '60%'],
            min: minVal,
            max: maxVal,
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
              formatter: '{value} M·KWH'
            },
            axisTick: {
              show: false
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, 30],
              color: '#2f4574',
              formatter: params => {
                return this.totalEnergyUsage;
              },
              textStyle: {
                fontSize: 14
              }
            },
            data: [
              // name: "当前用户总数",
              { value: (data / (1000 * 1000 * 1000)).toFixed(2) }
            ]
          }
        ]
      };
    },
    getChartData () {
      homeApi.homeFistChart(this.simpleParseParams({
        startTime: moment().subtract('days', 5).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data['总耗电'];
          console.log(data);
          if (data >= 100000) {
            this.totalEnergyUsage = (data / 1000000).toFixed(2) + 'M·KWH';
          } else {
            this.totalEnergyUsage = data + ' KWH';
          }
          const chartOption = this.chartOptions(data);
          this.chart.setOption(chartOption);
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
.gcem-arrow-up {
  color: #ff3366;
}
.gcem-arrow-down {
  color: #00cc66;
}
.first-panel
  height 350px
  .grey-text
    color #666
</style>