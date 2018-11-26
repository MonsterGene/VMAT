<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel v-model="chanchu_jiadong_byday.model" expand :dark="$vuetify.dark">
        <v-expansion-panel-content>
          <div slot="header">产出与稼动率分析（单站 - {{ $route.params.stationName }} - 每日趋势）</div>
          <e-chart
            ref="chanchuJiadong"
            :path-option="chanchu_jiadong_byday.chartOption"
            height="400px"
            width="100%"
            >
            </e-chart>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel v-model="jiadongByHour.model" expand :dark="$vuetify.dark">
        <v-expansion-panel-content>
          <div slot="header">稼动率与产出分析（单站单天【{{ jiadongByHour.date }}】小时趋势）</div>
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

    <v-flex lg12 sm12 xs12>
      <v-widget :title="'運行時間('+ $route.params.stationName +')'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
        <div slot="widget-content">
            <e-chart
            ref="yunxingshijian"
            :path-option="[
              ['dataset.source', dataset.dailyData2],
              ['color', [color.green.base, color.orange.base, color.red.base, color.blue.base]],
              ['legend.show', true],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis.axisLabel.show', true],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top'],
              
              ['series[1].type', 'bar'],
              ['series[1].label.show', true],
              ['series[1].smooth', true],
              ['series[1].stack', 1],
              ['series[1].label.position', 'top'],

              ['series[2].type', 'bar'],
              ['series[2].label.show', true],
              ['series[2].smooth', true],
              ['series[2].stack', 1],
              ['series[2].label.position', 'top'],

              ['series[3].smooth', true],
              ['series[3].type', 'bar'],
              ['series[3].label.show', true],
              ['series[3].stack', 1],
              ['series[3].label.position', 'top'],

              ['series[4].smooth', true],
              ['series[4].type', 'bar'],
              ['series[4].label.show', true],
              ['series[4].stack', 2],
              ['series[4].label.position', 'top'],

              ['series[5].smooth', true],
              ['series[5].type', 'bar'],
              ['series[5].label.show', true],
              ['series[5].stack', 2],
              ['series[5].label.position', 'top'],
          
              ['series[6].smooth', true],
              ['series[6].type', 'bar'],
              ['series[6].label.show', true],
              ['series[6].stack', 2],
              ['series[6].label.position', 'top'],
          
              ['series[7].smooth', true],
              ['series[7].type', 'bar'],
              ['series[7].label.show', true],
              ['series[7].stack', 2],
              ['series[7].label.position', 'top'],
          
              ['series[8].smooth', true],
              ['series[8].type', 'bar'],
              ['series[8].label.show', true],
              ['series[8].stack', 3],
              ['series[8].label.position', 'top'],
          
              ['series[9].smooth', true],
              ['series[9].type', 'bar'],
              ['series[9].label.show', true],
              ['series[9].stack', 3],
              ['series[9].label.position', 'top'],
          
              ['series[10].smooth', true],
              ['series[10].type', 'bar'],
              ['series[10].label.show', true],
              ['series[10].stack', 3],
              ['series[10].label.position', 'top'],
          
              ['series[11].smooth', true],
              ['series[11].type', 'bar'],
              ['series[11].label.show', true],
              ['series[11].stack', 3],
              ['series[11].label.position', 'top'],
          
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <output-analysis
        ref="yichangCishuShijian"
        :title="'异常次数/时间分析（'+ $route.params.stationName +'）'"
        :path-option="yichang_cishu_shijian_byday"
      ></output-analysis> 
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <v-layout v-if="yichangCishu.byType.show" row>
        <v-flex xs12>
          <v-widget :title="'机故类型次数分析（'+ yichangCishu.byType.date +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-header-action" style="width:260px;display:flex;">
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
            <div slot="widget-content">
              <e-chart
                ref="cishuByType"
                :path-option="yichangCishu.byType.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>   
            </div>
          </v-widget> 
        </v-flex>
      </v-layout>
      <v-layout v-if="yichangCishu.byDay.show" row>
        <v-flex xs12>
          <v-widget :title="'机故次数走势（'+ yichangCishu.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-content">
              <e-chart
                ref="cishuByDay"
                :path-option="yichangCishu.byDay.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>
              <v-toolbar flat :color="$vuetify.dark ? 'grey' : 'white'">
                <v-toolbar-title>异常处理方法：</v-toolbar-title>
              </v-toolbar>
              <v-data-table
                :headers="table.headers"
                :items="table.desserts"
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
      <v-layout v-if="yichangCishu.byHour.show" row>
        <v-flex xs12>
          <v-widget :title="'机故次数走势（'+ yichangCishu.byHour.date +' '+ yichangShijian.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-content">
              <e-chart 
                :path-option="yichangCishu.byHour.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>   
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <v-layout row v-if="yichangShijian.byType.show">
        <v-flex xs12>
          <v-widget :title="'异常类型分析（'+ yichangShijian.byType.date +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-header-action" style="width:260px;display:flex;">
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
            <div slot="widget-content">
              <e-chart
                ref="shijianByType"
                :path-option="yichangShijian.byType.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>              
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
      <v-layout row v-if="yichangShijian.byDay.show">
        <v-flex xs12>
          <v-widget :title="'机故时间走势（'+ yichangShijian.byDay.type +'）'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-content">
              <e-chart 
                ref="shijianByDay"
                :path-option="yichangShijian.byDay.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>
              <v-toolbar flat :color="$vuetify.dark ? 'grey' : 'white'">
                <v-toolbar-title>异常处理方法：</v-toolbar-title>
              </v-toolbar>
              <v-data-table
                :headers="table.headers"
                :items="table.desserts"
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
      <v-layout row v-if="yichangShijian.byHour.show">
        <v-flex xs12>
          <v-widget :title="'机故时间走势('+ yichangShijian.byHour.date +' '+ yichangShijian.byDay.type +')'" :content-bg="$vuetify.dark ? 'grey' : 'white'">
            <div slot="widget-content">
              <e-chart
                ref="shijianByHour"
                :path-option="yichangShijian.byHour.chartOption"
                height="400px"
                width="100%"
                >
              </e-chart>              
            </div>
          </v-widget> 
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import API from '../api/chart';
import Material from 'vuetify/es5/util/colors';
import OutputAnalysis from '../components/outputAnalysis.vue';
import ErrorAnalysis from '../components/errorAnalysis.vue';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    OutputAnalysis,
    ErrorAnalysis,
    EChart,
    VWidget
  },
  data () {
    console.log(API.dailyCishuShijian);
    return {
      dataset: {
        ...API
      },
      color: Material,
      datePicker: [
        { menu: false, date: moment().format('YYYY-MM-DD') },
        { menu: false, date: moment().format('YYYY-MM-DD') },
        { menu: false, date: moment().format('YYYY-MM-DD') },
        { menu: false, date: moment().format('YYYY-MM-DD') }
      ],
      jiadongByHour: {
        model: [false],
        date: moment().format('MM-DD'),
        chartOption: [
          ['dataset.source', API.hoursData],
          ['color', [Material.amber.base, Material.blue.base, Material.teal.base]],
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
      chanchu_jiadong_byday: {
        model: [false],
        chartOption: [
          ['dataset.source', API.dailyData1],
          ['color', [Material.amber.base, Material.blue.base, Material.teal.base]],
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
      yichang_cishu_shijian_byday: [
        ['dataset.source', API.dailyCishuShijian],
        ['color', [Material.red.base, Material.orange.base, Material.red.base]],
        ['legend.show', true],
        ['legend.selected', {}],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['yAxis', Array(2).fill({ axisLabel: { show: true }})],
        ['grid.left', '2%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],

        ['series[0].type', 'line'],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        
        ['series[1].type', 'bar'],
        ['series[1].label.show', true],
        ['series[1].smooth', false],
        ['series[1].label.show', true],
        ['series[1].yAxisIndex', 1]

      ],
      yichangCishu: {
        byType: {
          show: false,
          date: moment().format('MM-DD'),
          chartOption: [
            ['dataset.source', API.cishuByType],
            ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'line'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
            
          ]
        },
        byDay: {
          show: false,
          type: '异常类型',
          chartOption: [
            ['dataset.source', API.cishuByDay],
            ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'line'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
            
          ]
        },
        byHour: {
          show: false,
          date: moment().format('MM-DD'),
          chartOption: [
            ['dataset.source', API.cishuByHour],
            ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'line'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
            
          ]
        }
      },
      yichangShijian: {
        byType: {
          show: false,
          date: moment().format('MM-DD'),
          chartOption: [
            ['dataset.source', API.shijianByType],
            ['color', [Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'bar'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
          ]
        },
        byDay: {
          show: false,
          type: '异常类型',
          chartOption: [
            ['dataset.source', API.shijianByDay],
            ['color', [Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'bar'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
          ]
        },
        byHour: {
          show: false,
          date: moment().format('MM-DD'),
          chartOption: [
            ['dataset.source', API.shijianByHour],
            ['color', [Material.indigo.base, Material.teal.base]],
            ['legend.show', true],
            ['legend.selected', {}],
            ['toolbox.show', true],
            ['xAxis.axisLabel.show', true],
            ['yAxis', Array(1).fill({ axisLabel: { show: true }})],
            ['grid.left', '2%'],
            ['grid.bottom', '5%'],
            ['grid.right', '3%'],

            ['series[0].type', 'bar'],
            ['series[0].label.show', true],
            ['series[0].smooth', true],
          ]
        }
      },
      table: {
        headers: [
          { text: 'Work date', value: 'date' },
          { text: 'Machine name', value: 'machineName' },
          { text: 'Error code', value: 'errorCode' },
          { text: 'Error info', value: 'errorInfo' },
          { text: 'Error rootc', value: 'errorRoot' },
          { text: 'Error action', value: 'errorAction' },
          { text: 'Count', value: 'count' },
          { text: 'Action' }
        ],
        desserts: [
          {
            date: moment().format('YYYY-MM-DD'),
            machineName: 'test machine',
            errorCode: 'M10',
            errorInfo: '',
            errorRoot: '',
            errorAction: '',
            acount: ''
          }
        ]
      }
    };
  },
  watch: {
    'chanchu_jiadong_byday.model.0': function (n, o) {
      this.chartResize('chanchuJiadong', n);
    },
    'jiadongByHour.model.0': function (n, o) {
      this.chartResize('jiadongExp', n);
    },
    'yichangCishu.byType.show': function (n, o) {
      if (n) {
        console.log(API.cishuByHour);
        this.$nextTick(() => {
          this.$refs.cishuByType.chartInstance.on('click', evt => {
            this.yichangCishu.byDay.show = true;
            this.yichangCishu.byHour.show = false;
            this.yichangCishu.byDay.type = evt.name;

            this.yichangShijian.byDay.show = true;
            this.yichangShijian.byHour.show = false;
            this.yichangShijian.byDay.type = evt.name;
          });
        });
      }
    },
    'yichangCishu.byDay.show': function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.cishuByDay.chartInstance.on('click', evt => {
            this.yichangCishu.byHour.show = true;
            this.yichangCishu.byHour.date = evt.name;

            this.yichangShijian.byHour.show = true;
            this.yichangShijian.byHour.date = evt.name;
          });
        });
      }
    },
    'yichangShijian.byType.show': function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.shijianByType.chartInstance.on('click', evt => {
            this.yichangShijian.byDay.show = true;
            this.yichangShijian.byHour.show = false;
            this.yichangShijian.byDay.type = evt.name;

            this.yichangCishu.byDay.show = true;
            this.yichangCishu.byHour.show = false;
            this.yichangCishu.byDay.type = evt.name;
          });
        });
      }
    },
    'yichangShijian.byDay.show': function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.shijianByDay.chartInstance.on('click', evt => {
            this.yichangShijian.byHour.show = true;
            this.yichangShijian.byHour.date = evt.name;

            this.yichangCishu.byHour.show = true;
            this.yichangCishu.byHour.date = evt.name;
          });
        });
      }
    }
  },
  mounted () {
    // 产出稼动率点击
    this.$refs.chanchuJiadong.chartInstance.on('click', evt => {
      this.jiadongByHour.model = [true];
      this.jiadongByHour.date = evt.name;
      API.hoursData.reverse();
      this.$refs.jiadongExp.update();
    });

    // 异常次数或时间分析图点击
    this.$refs.yichangCishuShijian.chartInstance.on('click', evt => {
      console.log(evt);// evt.name evt.seriesName
      if (evt.seriesName === '次数') {
        this.littleShow(1, 1);
        this.yichangCishu.byType.date = evt.name;
      } else {
        this.littleShow(2, 1);
        this.yichangShijian.byType.date = evt.name;
      }
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
    littleShow (a, b) {
      // if (a === 1) {
      // Object.keys(this.yichangShijian).forEach(v => {
      //   this.yichangShijian[v].show = false;
      // });
      Object.keys(this.yichangCishu).forEach((v, i) => {
        if (i + 1 <= b) {
          this.yichangCishu[v].show = true;
        } else {
          this.yichangCishu[v].show = false;
        }
      });
      // } else {
      // Object.keys(this.yichangCishu).forEach(v => {
      //   this.yichangCishu[v].show = false;
      // });
      Object.keys(this.yichangShijian).forEach((v, i) => {
        if (i + 1 <= b) {
          this.yichangShijian[v].show = true;
        } else {
          this.yichangShijian[v].show = false;
        }
      });
      // }
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>