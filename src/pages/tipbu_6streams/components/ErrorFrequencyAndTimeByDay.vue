<template>
<v-widget :title="title" :content-bg="$vuetify.theme.primary">
  <template slot="widget-header-action">
    <slot name="widget-header-action"></slot>
  </template>
  <div slot="widget-content">
    <e-chart
    ref="chartDOM"
    :path-option="chartOption"
    height="400px"
    width="100%"
    >
    </e-chart>     
  </div>
</v-widget>
</template>

<script>
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import { stationApi } from '../api';

export default {
  components: {
    EChart,
    VWidget
  },
  props: ['title', 'startDate', 'endDate', 'lineId', 'stationId'],
  data () {
    return {
      chartData: { date: [] }
    };
  },
  computed: {
    chartOption () {
      return [
        ['dataset.source', this.chartData],
        ['color', ['#73fb79', '#bfbfbf']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.name', '日期'],
        ['xAxis.nameTextStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill(0).map((v, i) => {
          const name = ['次数', '时间（s）'];
          v = {
            show: true,
            type: 'value',
            name: name[i],
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
          return v;
        })],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],
        ['grid.tooltip.trigger', 'axis'],
        ['grid.tooltip.axisPointer.type', 'shadow'],

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
        ['series[1].type', 'bar'],
        ['series[1].label.show', false],
        ['series[1].smooth', false],
        ['series[1].yAxisIndex', 1]

      ];
    }
  },
  mounted () {
    this.getChartData();
    this.$refs.chartDOM.chartInstance.on('click', evt => {
      this.$emit('chart-click', {
        date: evt.data[0],
        value: evt.data[1],
        seriesName: evt.seriesName,
        seriesType: evt.seriesType,
        dataIndex: evt.dataIndex
      });
    });
  },
  methods: {
    getChartData () {
      stationApi.getErrorFrequencyAndTime({
        startDate: this.startDate,
        endDate: this.endDate,
        lineid: this.lineId,
        areaid: this.stationId
      }).then(res => {
        const data = res.data;
        if (data.success) {
          this.chartData = data.data;
          this.$nextTick(() => {
            this.$refs.chartDOM.update();
          });
        } else {
          console.log('获取异常时间数据失败！');
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>