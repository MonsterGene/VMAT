<template>
<v-container grid-list-xl fluid>
  <!-- complex chart -->
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <output-analysis
        ref="chanchuDacheng"
        :title="'产出与达成率分析（整线 - '+ $route.params.lineName +' - 每日趋势）'"
        :path-option="chanchu_dacheng_byday"
      >
        <div slot="widget-header-action" style="width:120px;height:48px">
          <v-select
            :items="['机种1','机种2','机种3','机种4','机种5']"
            label="机种选择"
            solo
          ></v-select>
        </div>
      </output-analysis>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel v-model="dachengByHour.model" expand>
        <v-expansion-panel-content>
          <div slot="header">产出与达成率分析（整线单天【{{ dachengByHour.date }}】 小时趋势）</div>
          <e-chart 
            ref="dachengExp"
            :path-option="dachengByHour.chartOption"
            height="400px"
            width="100%"
            >
            </e-chart>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <output-analysis
        ref="chanchuJiadong"
        :title="'产出与稼动率分析（整线 - '+ $route.params.lineName +' - 每日趋势）'"
        :path-option="chanchu_jiadong_byday"
      ></output-analysis> 
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel v-model="jiadongByHour.model" expand>
        <v-expansion-panel-content>
          <div slot="header">稼动率与产出分析（整线单天【{{ jiadongByHour.date }}】 小时趋势）</div>
          <e-chart
            ref="jiadongExp"
            :path-option="jiadongByHour.chartOption"
            height="400px"
            width="100%"
            >
            </e-chart>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <error-analysis
        ref="cishu"
        :title="'工站异常次数分析('+ $route.params.lineName +')'" 
        :path-option="yichangcishu_line"
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
        :path-option="yichangshijian_line"
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
import API from '../api/chart';
import EChart from '@/components/chart/echart';
import {
  campaignData,
} from '@/api/chart';
import Material from 'vuetify/es5/util/colors';
import _object from 'lodash/object';
import VWidget from '@/components/VWidget';
import OutputAnalysis from '../components/outputAnalysis.vue';
import ErrorAnalysis from '../components/errorAnalysis.vue';

export default {
  components: {
    EChart,
    VWidget,
    OutputAnalysis,
    ErrorAnalysis
  },
  data () {
    return {
      moment,
      selectedTab: 'tab-1',
      option: null,
      dataset: {
        campaign: campaignData,
        ...API
      },
      color: Material,
      dachengByHour: {
        model: [false],
        date: moment().format('MM-DD'),
        chartOption: [
          ['dataset.source', API.hoursData],
          ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
          ['legend.show', true],
          ['legend.selected', { 'Rate 1': false, 'Rate 2': false, 'Num 1': false, 'Num 2': false }],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],

          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', true],
          
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', true],

          ['series[2].type', 'line'],
          ['series[2].label.show', true],
          ['series[2].smooth', true],

          ['series[3].smooth', true],
          ['series[3].type', 'bar'],
          ['series[3].label.show', true],
          ['series[3].label.position', 'top'],

          ['series[4].smooth', true],
          ['series[4].type', 'bar'],
          ['series[4].label.show', true],
          ['series[4].label.position', 'top'],

          ['series[5].smooth', true],
          ['series[5].type', 'bar'],
          ['series[5].label.show', true],
          ['series[5].label.position', 'top'],
        ]
      },
      chanchu_dacheng_byday: [
        ['dataset.source', API.dailyData1],
        ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
        ['legend.show', true],
        ['legend.selected', { 'Rate 1': false, 'Rate 2': false, 'Num 1': false, 'Num 2': false }],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis.axisLabel.show', true],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', true],

        ['series[2].type', 'line'],
        ['series[2].label.show', true],
        ['series[2].smooth', true],

        ['series[3].smooth', true],
        ['series[3].type', 'bar'],
        ['series[3].label.show', true],
        ['series[3].label.position', 'top'],

        ['series[4].smooth', true],
        ['series[4].type', 'bar'],
        ['series[4].label.show', true],
        ['series[4].label.position', 'top'],

        ['series[5].smooth', true],
        ['series[5].type', 'bar'],
        ['series[5].label.show', true],
        ['series[5].label.position', 'top'],
      ],
      jiadongByHour: {
        model: [false],
        date: moment().format('MM-DD'),
        chartOption: [
          ['dataset.source', API.hoursData],
          ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
          ['legend.show', true],
          ['legend.selected', { 'Rate 1': false, 'Rate 2': false, 'Num 1': false, 'Num 2': false }],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],

          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', true],
          
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', true],

          ['series[2].type', 'line'],
          ['series[2].label.show', true],
          ['series[2].smooth', true],

          ['series[3].smooth', true],
          ['series[3].type', 'bar'],
          ['series[3].label.show', true],
          ['series[3].label.position', 'top'],

          ['series[4].smooth', true],
          ['series[4].type', 'bar'],
          ['series[4].label.show', true],
          ['series[4].label.position', 'top'],

          ['series[5].smooth', true],
          ['series[5].type', 'bar'],
          ['series[5].label.show', true],
          ['series[5].label.position', 'top'],
        ]
      },
      chanchu_jiadong_byday: [
        ['dataset.source', API.dailyData1],
        ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
        ['legend.show', true],
        ['legend.selected', { 'Rate 1': false, 'Rate 2': false, 'Num 1': false, 'Num 2': false }],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis.axisLabel.show', true],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
        ['series[1].type', 'line'],
        ['series[1].label.show', true],
        ['series[1].smooth', true],

        ['series[2].type', 'line'],
        ['series[2].label.show', true],
        ['series[2].smooth', true],

        ['series[3].smooth', true],
        ['series[3].type', 'bar'],
        ['series[3].label.show', true],
        ['series[3].label.position', 'top'],

        ['series[4].smooth', true],
        ['series[4].type', 'bar'],
        ['series[4].label.show', true],
        ['series[4].label.position', 'top'],

        ['series[5].smooth', true],
        ['series[5].type', 'bar'],
        ['series[5].label.show', true],
        ['series[5].label.position', 'top'],
      ],
      yichangcishu_line: [
        ['dataset.source', API.cishuByStation],
        ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
        ['legend.show', true],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis', Array(2).fill({ axisLabel: { show: true }})],
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
        ['color', [Material.indigo.base, Material.teal.base]],
        ['legend.show', true],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis', Array(2).fill({ axisLabel: { show: true }})],
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
      ]
    };
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
    // 产出达成分析图点击
    this.$refs.chanchuDacheng.chartInstance.on('click', evt => {
      console.log(evt);
      console.log(this.$refs.chanchuDacheng.chartInstance);
      this.dachengByHour.model = [true];
      this.dachengByHour.date = evt.name;
      API.hoursData.reverse();
      console.log(this.dachengByHour.model);
      this.$refs.dachengExp.update();
    });

    // 产出稼动分析图点击
    this.$refs.chanchuJiadong.chartInstance.on('click', evt => {
      this.jiadongByHour.model = [true];
      this.jiadongByHour.date = evt.name;
      API.hoursData.reverse();
      this.$refs.jiadongExp.update();
    });

    // 次数、时间分析图点击
    this.$refs.cishu.chartInstance.on('click', evt => {
      console.log(evt);
      this.$router.push({ path: '/tipbu-6streams/station-details/' + evt.name });
    });
    this.$refs.shijian.chartInstance.on('click', evt => {
      console.log(evt);
      this.$router.push({ path: '/tipbu-6streams/station-details/' + evt.name });
    });
  },
  methods: {
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