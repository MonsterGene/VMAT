<template>
<v-expansion-panel v-model="expansionModel" color="primary" expand>
  <v-expansion-panel-content>
    <div slot="header">{{ headerText }}</div>
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
  props: ['headerText', 'stationId', 'lineId'],
  data () {
    return {
      refreshInterval: 5000,
      intervalId: null,
      expansionModel: [true],
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
      chartData: { date: [] }
    };
  },
  computed: {
    chartOption () {
      const series = Object.keys(this.chartData);
      series.shift();

      return [
        ['dataset.source', this.chartData],
        ['color', [Material.amber.base, Material.blue.base, Material.teal.base]],
        ['legend.show', true],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis', Array(2).fill({ axisLabel: { show: true }})],
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
          }
          return defSeries;
        })]
      ];
    }
  },
  watch: {
    chartOption () {
      this.$refs.chartDOM.update();
      this.$refs.chartDOM.update();
    }
  },
  mounted () {
    this.getChartData();
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    getChartData () {
      const request1 = stationApi.getStationOutput.byDay({
        start_date: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        line_id: 1,
        area_id: 1
      });
      const request2 = null;

      axios.all([request1])
        .then(axios.spread((res1, res2) => {
          console.log(arguments);
          const resdata = res1.data;
          if (resdata.success) {
            const data = resdata.data;
            this.chartData = data;
            setTimeout(() => {
              this.$refs.chartDOM.update();
            }, 3000);

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