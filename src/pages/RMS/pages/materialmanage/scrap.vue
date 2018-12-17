<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart1.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart4.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
     <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart4.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
     <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
  </v-layout>  
</v-container>
</template>

<script>
import EChart from '@/components/chart/echart';
import { WipAPI } from '../../api';
import EchartAPI from '../../api/chart';
const API = { WipAPI };

export default {
  components: {
    EChart
  },  
  data () {
    return {
      expandss: [true],
      color: ['red'],
      chart1: {
        chartOption: [
          ['dataset.source', EchartAPI.wipChart1],
          ['title.text', 'WIP Trend Chart'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['toolbox.show', true],
          ['yAxis', new Array(2).fill({
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }, 
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#757575',
                type: 'dashed'
              }
            }
          })],
          ['xAxis.axisLabel.show', true],
          ['xAxis.axisLabel.rotate', 20],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', true], 
          ['series[0].label.position', 'top'],
          ['series[0].stack', 'input'],        
          ['series[1].type', 'bar'],
          ['series[1].label.show', true],
          ['series[1].smooth', true], 
          ['series[1].stack', 'input'],
          ['series[1].label.position', 'top'],
          ['series[2].type', 'bar'],
          ['series[2].label.show', true],
          ['series[2].smooth', true],
          ['series[2].stack', 'output'],
          ['series[2].label.position', 'top'],
          ['series[3].type', 'bar'],
          ['series[3].label.show', true],
          ['series[3].smooth', true],
          ['series[3].stack', 'output'],
          ['series[3].label.position', 'top'],
          ['series[4].type', 'line'],
          ['series[4].label.show', true],
          ['series[4].smooth', true],
          ['series[4].yAxisIndex', '1'],
          ['series[5].type', 'line'],
          ['series[5].label.show', true],
          ['series[5].smooth', true],        
        ]
      },
      chart2: {
        chartOption: [
          ['dataset.source', EchartAPI.wipChart2],
          ['title.text', 'Production Yield(Fail Qty:164,Packing Qty:3510)'],
          ['color', ['#3F51B5', '#E91E63']],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['toolbox.show', true],
          ['yAxis', [
            {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed'
                }
              }, 
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  color: '#757575',
                  type: 'dashed'
                }
              }
            },
            {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed'
                }
              }, 
              axisLabel: {
                formatter: '{value}%'
              },
              axisLine: {
                lineStyle: {
                  color: '#757575',
                  type: 'dashed'
                }
              }
            }],
          ],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],

          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', true],
          ['series[0].label.position', 'top'],       
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].yAxisIndex', '1'],
          ['series[1].smooth', true],      
        ]
      },
      chart3: {
        chartOption: [
          ['dataset.source', EchartAPI.hoursData],
          ['title.text', 'ICT Fail Root cause distrlbution(Total output 117pcs)'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['color', ['red', 'green', 'yellow']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],

          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', true],         
          ['series[1].type', 'bar'],
          ['series[1].label.show', true],
          ['series[1].smooth', true],
          ['series[2].type', 'line'],
          ['series[2].label.show', true],
          ['series[2].smooth', true],         
        ]
      },
      chart4: {
        chartOption: [
          ['dataset.source', EchartAPI.hoursData],
          ['title.text', 'Top 10 FT Fail Root Cause 278(Total Output 315)'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['color', ['red', 'green']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],

          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', true],         
          ['series[1].type', 'bar'],
          ['series[1].label.show', true],
          ['series[1].smooth', true],
          ['series[2].type', 'line'],
          ['series[2].label.show', true],
          ['series[2].smooth', true],           
        ]
      }                
    };
  },
  mounted () {
    API.WipAPI.getBu().then(res => {
      const data = res.data;
      console.log(data);
    });
  }
};
</script>

<style lang='stylus' scoped>
  .echarts
    background-color #FFF
    border-radius 5px
</style>