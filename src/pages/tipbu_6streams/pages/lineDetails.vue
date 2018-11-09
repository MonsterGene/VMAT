<template>
<v-container grid-list-xl fluid>
  <!-- complex chart -->
  <v-layout row wrap>  
    <v-flex lg12 sm12 xs12>
      <output-analysis
        ref="chanchuDacheng"
        :title="'产出与达成率分析（'+ $route.params.lineName +'）'"
        :path-option="chanchu_dacheng_byday"
      ></output-analysis>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel v-model="dachengByHour.model" expand>
        <v-expansion-panel-content>
          <div slot="header">产出与达成率分析（{{ dachengByHour.date }}）</div>
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
        :title="'产出与稼动率分析（'+ $route.params.lineName +'）'"
        :path-option="chanchu_jiadong_byday"
      ></output-analysis> 
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <v-expansion-panel expand>
        <v-expansion-panel-content>
          <div slot="header">稼动率与产出分析（By Hour）</div>
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData1],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {'Line 1': false, 'Line 2': false, 'Bar 1': false, 'Bar 2': false}],
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
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <error-analysis
        :title="'异常次数分析('+ $route.params.lineName +')'" 
        :path-option="yichangcishu_line"
      ></error-analysis>           
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <error-analysis
        :title="'异常时间分析('+ $route.params.lineName +')'" 
        :path-option="yichangshijian_line"
      ></error-analysis>           
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <v-widget title="机故类型分析[次数(类型)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.cishuByStation],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              
              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计次数(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]

            ]"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget>            
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="异常类型分析[时间(类型)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.shijianByStation],
              ['color', [color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],

              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计时间(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]
            ]"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>             
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="机故次数走势[Error frequency(Day)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.cishuByStation],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              
              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计次数(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]

            ]"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget>            
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="机故时间走势[Error time(Day)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.shijianByStation],
              ['color', [color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],

              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计时间(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]
            ]"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>             
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="机故次数走势[Error frequency(Hour)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.cishuByStation],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              
              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计次数(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]

            ]"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget>            
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="机故时间走势[Error time(Hour)]">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.shijianByStation],
              ['color', [color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis', Array(2).fill({axisLabel: {show: true}})],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],

              ['series[1].type', 'line'],
              ['series[1].label.show', true],
              ['series[1].smooth', false],
              ['series[1].label.formatter', function(params){
                return (params.value['累计时间(%)']).toFixed(2) + '%'
              }],
              ['series[1].yAxisIndex', 1]
            ]"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>             
    </v-flex>
    
    <v-flex lg12 sm12 xs12>
      <v-widget title="運行時間(By Day)" content-bg="white">
        <v-btn icon slot="widget-header-action">
          <v-icon class="text--secondary">refresh</v-icon>
        </v-btn>
        <div slot="widget-content">
            <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData2],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {'Bar 1': false, 'Bar 2': false, 'Bar 3': false, 'Bar 4': false}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis.axisLabel.show', true],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[3].label.position', 'top'],
              
              ['series[1].type', 'bar'],
              ['series[1].label.show', true],
              ['series[1].smooth', true],
              ['series[3].label.position', 'top'],

              ['series[2].type', 'bar'],
              ['series[2].label.show', true],
              ['series[2].smooth', true],
              ['series[3].label.position', 'top'],

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
          
              ['series[6].smooth', true],
              ['series[6].type', 'bar'],
              ['series[6].label.show', true],
              ['series[6].label.position', 'top'],
          
              ['series[7].smooth', true],
              ['series[7].type', 'bar'],
              ['series[7].label.show', true],
              ['series[7].label.position', 'top'],
          
              ['series[8].smooth', true],
              ['series[8].type', 'bar'],
              ['series[8].label.show', true],
              ['series[8].label.position', 'top'],
          
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <v-widget title="異常分佈(By Day)" content-bg="white">
        <v-btn icon slot="widget-header-action">
          <v-icon class="text--secondary">refresh</v-icon>
        </v-btn>
        <div slot="widget-content">
            <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData1],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {'Line 1': false, 'Line 2': false}],
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

            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
    </v-flex>

    <v-flex lg6 sm12 xs12>
      <v-widget title="机故异常(By Hour)(2018/07/01)">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData1],
              ['color', [color.amber.base, color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {'Line 1': false, 'Line 2': false}],
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

            ]"
            height="400px"
            width="100%"
            >
          </e-chart>   
        </div>
      </v-widget>            
    </v-flex>
    <v-flex lg6 sm12 xs12>
      <v-widget title="机台产出(By Hour)(2018/07/01)">
        <div slot="widget-content">
          <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData1],
              ['color', [color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis.axisLabel.show', true],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
            
            ]"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>             
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <v-widget title="机故类型分布(2018-11-05)" content-bg="white">
        <v-btn icon slot="widget-header-action">
          <v-icon class="text--secondary">refresh</v-icon>
        </v-btn>
        <div slot="widget-content">
            <e-chart 
            :path-option="[
              ['dataset.source', dataset.dailyData1],
              ['color', [color.indigo.base, color.teal.base]],
              ['legend.show', true],
              ['legend.selected', {}],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis.axisLabel.show', true],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'line'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              
              ['series[1].type', 'bar'],
              ['series[1].label.show', true],
              ['series[1].smooth', true],
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
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
          ['dataset.source', API.dailyData1],
          ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
          ['legend.show', true],
          ['legend.selected', { 'Line 1': false, 'Line 2': false, 'Bar 1': false, 'Bar 2': false }],
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
        ['legend.selected', { 'Line 1': false, 'Line 2': false, 'Bar 1': false, 'Bar 2': false }],
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
      chanchu_jiadong_byday: [
        ['dataset.source', API.dailyData1],
        ['color', [Material.amber.base, Material.indigo.base, Material.teal.base]],
        ['legend.show', true],
        ['legend.selected', { 'Line 1': false, 'Line 2': false, 'Bar 1': false, 'Bar 2': false }],
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
      ]
    };
  },
  watch: {
    'dachengByHour.model.0': function (n) {
      if (n) {
        setTimeout(() => {
          this.$refs['dachengExp'].resize();
        }, 300);
        
      }
    }
  },
  created () {
    // console.log(this.$refs.chart);
    return false;
  },
  mounted () {
    this.$refs.chanchuDacheng.chartInstance.on('click', evt => {
      console.log(evt);
      console.log(this.$refs.chanchuDacheng.chartInstance);
      this.dachengByHour.model[0] = true;
      this.dachengByHour.date = evt.name;
      API.dailyData1.reverse();
    });
  },
  methods: {
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
    }
  },
};
</script>