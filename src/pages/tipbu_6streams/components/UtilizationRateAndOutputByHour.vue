<template>
<v-expansion-panel v-model="expansionModel" :dark="$vuetify.dark" expand>
  <v-expansion-panel-content :style="{background: $vuetify.theme.primary}">
    <div slot="header"><h4>{{ headerText }}</h4></div>
    <e-chart
      ref="chartDOM"
      :path-option="chartOption"
      height="400px"
      width="100%"
      >
      </e-chart>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { stationApi } from '../api';
import moment from 'moment';
import Material from 'vuetify/es5/util/colors';
import axios from 'axios';
import EChart from '@/components/chart/echart';

export default {
  components: {
    EChart
  },
  props: ['headerText', 'date', 'stationId', 'lineId', 'type'],
  data () {
    return {
      refreshInterval: 5000,
      intervalId: null,
      expansionModel: [false],
      seriesConf: {
        smooth: true,
        label: {
          show: true,
          position: 'top',
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(255,255,255,10)',
              shadowBlur: 5,
            }
          }
        }
      },
      chartData: { hour: [] }
    };
  },
  computed: {
    chartOption () {
      const series = Object.keys(this.chartData);
      series.shift();

      return [
        ['dataset.source', this.chartData],
        // ['color', ['#fff2cc', '#afabab', '#8faadc', '#ff40ff', '#73fb79', '#fffc00']],
        ['color', ['#fff2cc', '#3f9b3b', '#8faadc', '#ff40ff', '#73fb79', '#fffc00']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill(0).map((v, i) => {
          const d = {
            show: true,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, .54)',
                type: 'dashed'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                show: true,
                color: 'rgba(255, 255, 255, .54)',
                type: 'dashed'
              }
            },
            axisLabel: {
              show: true,
              color: 'rgba(255, 255, 255, .54)'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          };
          if (i === 1) {
            d.max = 100;
            d.min = 0;
          }
          return d;
        })],    
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],
        ['series', series.map(v => {
          const defSeries = JSON.parse(JSON.stringify(this.seriesConf));
          if (v.indexOf('Output') > -1) {
            defSeries.yAxisIndex = 0;
            defSeries.type = 'bar';
          } else {
            defSeries.yAxisIndex = 1;
            defSeries.type = 'line';
            defSeries.smooth = false;
          }
          return defSeries;
        })]
      ];
    }
  },
  watch: {
    date () {
      if (!this.expansionModel[0]) {
        this.expansionModel = [true];
      }
      this.getChartData();
    },
    'expansionModel.0': function (n) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.chartDOM.chartInstance.resize();
        });
      }
    }
  },
  mounted () {
    this.getChartData();
  },
  methods: {
    getChartData () {
      // 请求产出数据
      const request1 = stationApi.getStationOutput.byHour({
        date: moment(this.date).format('YYYY-MM-DD'),
        line_id: this.lineId,
        area_id: this.stationId
      });
      // 请求稼动率数据
      const request2 = stationApi.getUtilizationRate.byHour({
        date: moment(this.date).format('YYYY-MM-DD'),
        line_id: this.lineId,
        area_id: this.stationId
      });

      axios.all([request1, request2])
        .then(axios.spread((res1, res2) => {
          const resdata = res1.data;
          const res2data = res2.data;
          if (resdata.success) {
            const data = resdata.data;
            if (this.type === 'achive') {
              this.chartData = data;
            } else {
              const outputKey = Object.keys(resdata.data).filter(v => v.indexOf('Output') > -1)[0];
              this.chartData = {
                hour: res2data.data.hour
              };
              this.chartData[outputKey] = resdata.data[outputKey];
              this.chartData.Utilization = res2data.data.Utilization;
            }
            this.$nextTick(() => {
              this.$refs.chartDOM.update();
            });
          } else {
            console.log('加载产出数据出错！');
          }
        }));
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>