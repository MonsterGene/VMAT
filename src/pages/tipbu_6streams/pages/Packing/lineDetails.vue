<template>
<v-container grid-list-xl fluid>
  <!-- complex chart -->
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与达成率分析（整线 - ' + $route.params.lineName + '- 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        :open="true"
        type="achive"
        @chart-click="yieldOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与达成率分析（整线单天 - ' + $route.params.lineName + '- 每日趋势 -'+ yieldOutputByHour.date +'）'"
        :date="yieldOutputByHour.date"
        :line-id="yieldOutputByHour.lineId"
        :station-id="$route.query.s"
        type="achive"
      ></utilization-rate-and-output-by-hour>
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与稼动率分析（整线 - ' + $route.params.lineName + '- 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        :open="true"
        type="util"
        @chart-click="utilOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与稼动率分析（整线单天 - ' + $route.params.lineName + '- 每日趋势 -'+ utilOutputByHour.date +'）'"
        :date="utilOutputByHour.date"
        :line-id="utilOutputByHour.lineId"
        :station-id="$route.query.s"
      ></utilization-rate-and-output-by-hour>
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <error-analysis
        ref="cishu"
        :title="'工站异常次数分析('+ $route.params.lineName +')'" 
        :path-option="errorFreqOption"
        type="util"
      >
        <div slot="widget-header-action" style="width:380px;display:flex;height:100%">
          <div style="width:120px;">
            <v-select
              :items="['A01', 'A02', 'A03']"
              label="线别选择"
              solo
            ></v-select>
          </div>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[0].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[0].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[0].date" @input="datePicker[0].menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[1].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[1].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[1].date" @input="datePicker[1].menu = false"></v-date-picker>
          </v-menu>
        </div>
      </error-analysis>           
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <error-analysis
        ref="shijian"
        :title="'工站异常时间分析('+ $route.params.lineName +')'" 
        :path-option="errorTimeOption"
      >
        <div slot="widget-header-action" style="width:380px;display:flex;height:48px">
          <div style="width:120px;">
            <v-select
              :items="['A01', 'A02', 'A03']"
              label="线别选择"
              solo
            ></v-select>
          </div>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[2].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[2].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[2].date" @input="datePicker[2].menu = false"></v-date-picker>
          </v-menu>
          <v-menu
            :close-on-content-click="false"
            v-model="datePicker[3].menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            style="flex:1"
          >
            <v-text-field
              slot="activator"
              v-model="datePicker[3].date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="datePicker[3].date" @input="datePicker[3].menu = false"></v-date-picker>
          </v-menu>
        </div>
      </error-analysis>           
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import API from '../../api/chart';
import { lineApi } from '../../api';

import EChart from '@/components/chart/echart';
import {
  campaignData,
} from '@/api/chart';
import Material from 'vuetify/es5/util/colors';
import VWidget from '@/components/VWidget';
import OutputAnalysis from '../../components/outputAnalysis.vue';
import ErrorAnalysis from '../../components/errorAnalysis.vue';
import UtilizationRateAndOutputByDay from '../../components/UtilizationRateAndOutputByDay.vue';
import UtilizationRateAndOutputByHour from '../../components/UtilizationRateAndOutputByHour.vue';
import { deepCopyObject } from '../../../../util/utils';

export default {
  components: {
    EChart,
    VWidget,
    OutputAnalysis,
    ErrorAnalysis,
    UtilizationRateAndOutputByDay,
    UtilizationRateAndOutputByHour
  },
  data () {
    return {
      yieldOutputByHour: {
        date: moment().format('YYYY-MM-DD'),
        lineId: this.$route.query.l
      },
      utilOutputByHour: {
        date: moment().format('YYYY-MM-DD'),
        lineId: this.$route.query.l
      },
      selectedTab: 'tab-1',
      option: null,
      dataset: {
        campaign: campaignData,
        ...API
      },
      color: Material,
      yichangcishu_line: [
        ['dataset.source', API.cishuByStation],
        ['color', ['#bfbfbf', '#73fb79']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill({
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
        
        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', false],
        ['series[1].label.formatter', function (params) {
          return (params.value['累计次数(%)']).toFixed(2) + '%';
        }],
        ['series[1].yAxisIndex', 1]
      ],
      yichangshijian_line: [
        ['dataset.source', API.shijianByStation],
        ['color', ['#bfbfbf', '#73fb79']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill({
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

        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', false],
        ['series[1].label.formatter', function (params) {
          return (params.value['累计时间(%)']).toFixed(2) + '%';
        }],
        ['series[1].yAxisIndex', 1]
      ],
      datePicker: [
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        }
      ],
      errorTimeData: {},
      errorFreqData: {}
    };
  },
  computed: {
    errorFreqOption () {
      const dataset = deepCopyObject(this.errorFreqData);
      if (!dataset.station) return;
      dataset.station = dataset.station.map(v => v.name);
      const total = dataset.frequency.reduce((acc, cur) => (acc + cur), 0);
      let accFreq = 0;
      dataset['累计次数'] = dataset.frequency.map(v => {
        accFreq += v;
        return (accFreq / total) * 100;
      });
      return [
        ['dataset.source', dataset],
        ['color', ['#bfbfbf', '#73fb79']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill({
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
        
        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', false],
        ['series[1].label.formatter', function (params) {
          console.log(params);
          return (params.value[2]).toFixed(2) + '%';
        }],
        ['series[1].yAxisIndex', 1]
      ];
    },
    errorTimeOption () {
      let dataset = deepCopyObject(this.errorTimeData);
      dataset = {
        station: dataset.station,
        time: dataset.frequency,
      };
      if (!dataset.station) return;
      dataset.station = dataset.station.map(v => v.name);
      const totalTime = dataset.time.reduce((acc, cur) => (acc + cur), 0);
      let accTime = 0;
      dataset['累计时间'] = dataset.time.map(v => {
        accTime += v;
        return (accTime / totalTime) * 100;
      });
      return [
        ['dataset.source', dataset],
        ['color', ['#bfbfbf', '#73fb79']],
        ['legend.show', true],
        ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisTick.lineStyle.color', 'rgba(255,255,255,.54)'],
        ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
        ['yAxis', Array(2).fill({
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
        ['series[0].smooth', false],

        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', false],
        ['series[1].label.formatter', function (params) {
          return (params.value[2]).toFixed(2) + '%';
        }],
        ['series[1].yAxisIndex', 1]
      ];
    }
  },
  watch: {
    'dachengByHour.model.0': function (n) {
      this.chartResize('dachengExp', n);
    },
    'jiadongByHour.model.0': function (n) {
      this.chartResize('jiadongExp', n);
    }
  },
  mounted () {
    // 次数、时间分析图点击
    // this.$refs.cishu.chartInstance.on('click', evt => {
    //   console.log(evt);
    //   this.$router.push({ path: '/npbg_lh_smart_test/mfg_3/packing/station-details/' + evt.name + '?l=' + this.$route.query.l });
    // });
    // this.$refs.shijian.chartInstance.on('click', evt => {
    //   console.log(evt);
    //   this.$router.push({ path: '/npbg_lh_smart_test/mfg_3/packing/station-details/' + evt.name });
    // });

    this.getErrorFreqByStation();
    this.getErrorTimeByStation();
  },
  methods: {
    getErrorFreqByStation () {
      const date = moment().format('YYYY-MM-DD');
      lineApi.getErrorFrequencyByStation({
        startDate: date,
        endDate: date,
        lineID: this.$route.query.l
      }).then(res => {
        console.log(res);
        if (res && res.status === 200 && res.data.success) {
          const data = res.data;
          this.errorFreqData = data.data;
        }
      });
    },
    getErrorTimeByStation () {
      const date = moment().format('YYYY-MM-DD');
      lineApi.getErrorTimeByStation({
        startDate: date,
        endDate: date,
        lineID: this.$route.query.l
      }).then(res => {
        console.log(res);
        if (res && res.status === 200 && res.data.success) {
          this.errorTimeData = res.data.data;
        }
      });
    },
    yieldOutputByDayClick (evt) {
      console.log(evt);
      this.yieldOutputByHour.date = evt.date;
    },
    utilOutputByDayClick (evt) {
      console.log(evt);
      this.utilOutputByHour.date = evt.date;
    },
    chartResize (name, n) {
      if (n) {
        setTimeout(() => {
          this.$refs[name].resize();
        }, 300);
      }
    },
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
    }
  },
};
</script>