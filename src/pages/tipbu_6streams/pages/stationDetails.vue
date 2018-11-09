<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <output-analysis
        :title="'产出与稼动率分析（'+ $route.params.stationName +'）'"
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
    <v-flex lg12 sm12 xs12>
      <output-analysis
        :title="'异常次数/时间分析（'+ $route.params.stationName +'）'"
        :path-option="yichang_cishu_shijian_byday"
      ></output-analysis> 
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
  </v-layout>
</v-container>
</template>

<script>
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
      yichang_cishu_shijian_byday: [
        ['dataset.source', API.dailyCishuShijian],
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
        ['series[1].label.show', true],
        ['series[1].yAxisIndex', 1]

      ]
    };
  }
};
</script>

<style lang='stylus' scoped>

</style>