<template>
<v-flex lg6 sm12 xs12 v-if="showLevel">
  <v-layout row v-if="showLevel>=1">
    <v-flex xs12>
      <v-widget :title="'机故类型次数分析'" content-bg="#282a30">
        <div slot="widget-header-action" style="width:260px;display:flex;">
          <v-menu
            :close-on-content-click="false"
            v-model="frequencyByType.startDate.menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="frequencyByType.startDate.date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="frequencyByType.startDate.date" @input="frequencyByType.startDate.menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="frequencyByType.endDate.menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="frequencyByType.endDate.date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="frequencyByType.endDate.date" @input="frequencyByType.endDate.menu = false"></v-date-picker>
          </v-menu>
        </div>
        <div slot="widget-content">
          <e-chart
            ref="frequencyByType"
            :path-option="frequencyByTypeChartOption"
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
      <v-widget :title="'机故次数走势（'+ frequencyByDay.type +'）'" content-bg="#282a30">
        <div slot="widget-content">
          <e-chart
            ref="frequencyByDay"
            :path-option="frequencyByDayChartOption"
            @chart-click="$emit('chart-click', $event, 2)"
            height="400px"
            width="100%"
            >
          </e-chart>
          <v-toolbar flat :color="$vuetify.dark ? 'grey' : 'white'">
            <v-toolbar-title>异常处理方法：</v-toolbar-title>
          </v-toolbar>
          <v-data-table
            :headers="solution.tableHeaders"
            :items="solution.data"
            :hide-actions="true"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.date }}</td>
              <td class="text-xs-right">{{ props.item.machineName }}</td>
              <td class="text-xs-right">{{ props.item.errorCode }}</td>
              <td class="text-xs-right">{{ props.item.errorInfo }}</td>
              <td class="text-xs-right">{{ props.item.errorRoot }}</td>
              <td class="text-xs-right">{{ props.item.errorAction }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
              <td class="text-xs-right">
                <v-btn color="success">修改</v-btn>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-widget>
    </v-flex>
  </v-layout>
  <v-layout row v-if="showLevel>=3">
    <v-flex xs12>
      <v-widget :title="'机故次数走势（'+ frequencyByHour.date +' '+ frequencyByHour.type +'）'" content-bg="#282a30">
        <div slot="widget-content">
          <e-chart
            ref="frequencyByHour"
            :path-option="frequencyByHourChartOption"
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
  props: [
    'showLevel',
    'date',
    'lineId',
    'stationId'
  ],
  data () {
    return {
      frequencyByType: {
        startDate: { menu: false, date: this.date },
        endDate: { menu: false, date: this.date },
        chartData: { type: [] }
      },
      frequencyByDay: {
        type: null,
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().subtract('weeks', 1).format('YYYY-MM-DD'),
        chartData: { date: [] }
      },
      frequencyByHour: {
        date: null,
        type: null,
        chartData: { hour: [] }
      },
      solution: {
        tableHeaders: [
          { text: 'Error code', value: 'errorCode' },
          { text: 'Error info', value: 'errorInfo' },
          { text: 'Error rootc', value: 'errorRoot' },
          { text: 'Error action', value: 'errorAction' },
          { text: 'Count', value: 'count' },
          { text: 'Action', value: 'errorCode' }
        ],
        data: [
          {
            errorCode: '',
            errorInfo: '',
            errorRoot: '',
            errorAction: '',
            acount: ''
          }
        ]
      }
    };
  },
  computed: {
    frequencyByTypeChartOption () {
      return [
        ['dataset.source', this.frequencyByType.chartData],
        ['color', ['#73fb79']],
        ['legend.show', true],
        ['legend.selected', {}],
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

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
      ];
    },
    frequencyByDayChartOption () {
      return [
        ['dataset.source', this.frequencyByDay.chartData],
        ['color', ['#73fb79']],
        ['legend.show', true],
        ['legend.selected', {}],
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

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
      ];
    },
    frequencyByHourChartOption () {
      return [
        ['dataset.source', this.frequencyByHour.chartData],
        ['color', ['#73fb79']],
        ['legend.show', true],
        ['legend.selected', {}],
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

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
      ];
    }
  },
  watch: {
    date (n, o) {
      this.frequencyByType.startDate.date = n;
      this.frequencyByType.endDate.date = n;
    },
    showLevel (n, o) {
      if (n === 1) {
        this.frequencyByType.chartData = {
          type: ['Error 1', 'Error 2', 'Error 3', 'Error 4'],
          frequency: [2, 4, 7, 3]
        };
      } else if (n === 2) {
        this.frequencyByDay.chartData = {
          date: ['12-01', '12-02', '12-03', '12-04'],
          frequency: [2, 4, 7, 3]
        };
      } else if (n === 3) {
        this.frequencyByHour.chartData = {
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