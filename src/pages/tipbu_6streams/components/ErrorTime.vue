<template>
<v-flex lg6 sm12 xs12 v-if="showLevel">
  <v-layout row v-if="showLevel>=1">
    <v-flex xs12>
      <v-widget :title="'异常类型分析'" content-bg="#282a30">
        <div slot="widget-header-action" style="width:260px;display:flex;">
          <v-menu
            :close-on-content-click="false"
            v-model="timeByType.startDate.menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="timeByType.startDate.date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="timeByType.startDate.date" @input="timeByType.startDate.menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="timeByType.endDate.menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="timeByType.endDate.date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="timeByType.endDate.date" @input="timeByType.endDate.menu = false"></v-date-picker>
          </v-menu>
        </div>
        <div slot="widget-content">
          <e-chart
            :path-option="timeByTypeChartOption"
            @chart-click="$emit('chart-click', $event, 1)"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <v-layout row v-if="showLevel>=2">
    <v-flex xs12>
      <v-widget :title="'机故时间走势（'+ timeByDay.type +'）'" content-bg="#282a30">
        <div slot="widget-content">
          <e-chart 
            :path-option="timeByDayChartOption"
            @chart-click="$emit('chart-click', $event, 2)"
            height="400px"
            width="100%"
            >
          </e-chart>
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <v-layout row v-if="showLevel>=3">
    <v-flex xs12>
      <v-widget :title="'机故时间走势('+ timeByHour.date +' '+ timeByHour.type +')'" content-bg="#282a30">
        <div slot="widget-content">
          <e-chart
            :path-option="timeByHourChartOption"
            @chart-click="$emit('chart-click', $event, 3)"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget> 
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
import moment from 'moment';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    EChart, VWidget
  },
  props: ['showLevel', 'date', 'lineId', 'stationId'],
  data () {
    return {
      timeByType: {
        startDate: { menu: false, date: this.date },
        endDate: { menu: false, date: this.date },
        chartData: { type: [] }
      },
      timeByDay: {
        type: null,
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().subtract('weeks', 1).format('YYYY-MM-DD'),
        chartData: { date: [] }
      },
      timeByHour: {
        date: null,
        type: null,
        chartData: { hour: [] }
      }
    };
  },
  computed: {
    timeByTypeChartOption () {
      return [
        ['dataset.source', this.timeByType.chartData],
        ['color', ['#bfbfbf']],
        ['legend.show', true],
        // ['legend.selected', {}],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(1).fill({
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
        })],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],

        ['series[0].type', 'bar'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
      ];
    },
    timeByDayChartOption () {
      return [
        ['dataset.source', this.timeByDay.chartData],
        ['color', ['#bfbfbf']],
        ['legend.show', true],
        // ['legend.selected', {}],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', {
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
        }],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],

        ['series[0].type', 'bar'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
      ];
    },
    timeByHourChartOption () {
      return [
        ['dataset.source', this.timeByHour.chartData],
        ['color', ['#bfbfbf']],
        ['legend.show', true],
        // ['legend.selected', {}],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', {
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
        }],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],
        

        ['series[0].type', 'bar'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
      ];
    }
  },
  watch: {
    date (n, o) {
      this.timeByType.startDate.date = n;
      this.timeByType.endDate.date = n;
    },
    showLevel (n, o) {
      if (n === 1) {
        this.timeByType.chartData = {
          type: ['Error 1', 'Error 2', 'Error 3', 'Error 4'],
          frequency: [2, 4, 7, 3]
        };
      } else if (n === 2) {
        this.timeByDay.chartData = {
          date: ['12-01', '12-02', '12-03', '12-04'],
          frequency: [2, 4, 7, 3]
        };
      } else if (n === 3) {
        this.timeByHour.chartData = {
          hour: ['08:00', '09:00', '10:00', '11:00'],
          frequency: [2, 4, 7, 3]
        };
      }
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>