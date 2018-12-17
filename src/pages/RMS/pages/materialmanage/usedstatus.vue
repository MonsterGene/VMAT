<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg6 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart5.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <!-- <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart4.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
     <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart4.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
     <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart2.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm4 xs4>
      <e-chart class="echarts"
        :path-option="chart3.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex> -->
  </v-layout>  
</v-container>
</template>

<script>
import EChart from '@/components/chart/echart';
import { WipAPI, REApi } from '../../api';
import EchartAPI from '../../api/chart';
// const API = { WipAPI };
const API = { REApi };

// ChartApi.bingtu

export default {
  components: {
    EChart
  },  
  data () {
    return {
      expandss: [true],
      color: ['blue'],
      chart5: {
        chartOption: [
          ['dataset.source', REApi.wipChart1],
          ['color', ['#EB786C', '#002060']],
          ['title.textStyle.color', ['#F34941']],
          ['title.text', 'MFGI每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],    
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['toolbox.show', true],
          // ['yAxis[0].type', 'value'],
          // ['yAxis[0].splitLine.show', true],
          // ['yAxis[0].splitLine.lineStyle.type', 'dashed'],
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
          ['grid.left', '1%'],
          ['grid.bottom', '2%'],
          ['grid.right', '1%'],
          ['grid.top', '20%'],
          ['grid.backgroundcolor', 'red'],
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', true], 
          ['series[0].label.position', 'top'],
          ['series[0].stack', 'input'],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', true], 
          ['series[1].label.position', 'top'],
          ['series[1].stack', 'input'],
        ]
      },
      // chart2: {
      //   chartOption: [
      //     ['dataset.source', ChartApi.wipChart2],
      //     ['title.text', 'Production Yield(Fail Qty:164,Packing Qty:3510)'],
      //     ['color', ['#3F51B5', '#E91E63']],
      //     ['title.left', '1%'],
      //     ['title.top', '1%'],
      //     ['legend.show', true],
      //     ['legend.top', '9%'],
      //     ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
      //     ['toolbox.show', true],
      //     ['yAxis', [
      //       {
      //         type: 'value',
      //         splitLine: {
      //           show: true,
      //           lineStyle: {
      //             type: 'dashed'
      //           }
      //         }, 
      //         axisLabel: {
      //           formatter: '{value}'
      //         },
      //         axisLine: {
      //           lineStyle: {
      //             color: '#757575',
      //             type: 'dashed'
      //           }
      //         }
      //       },
      //       {
      //         type: 'value',
      //         splitLine: {
      //           show: true,
      //           lineStyle: {
      //             type: 'dashed'
      //           }
      //         }, 
      //         axisLabel: {
      //           formatter: '{value}%'
      //         },
      //         axisLine: {
      //           lineStyle: {
      //             color: '#757575',
      //             type: 'dashed'
      //           }
      //         }
      //       }],
      //     ],
      //     ['xAxis.axisLabel.show', true],
      //     ['yAxis.axisLabel.show', true],
      //     ['grid.left', '2%'],
      //     ['grid.bottom', '5%'],
      //     ['grid.right', '3%'],
      //     ['grid.top', '20%'],

      //     ['series[0].type', 'bar'],
      //     ['series[0].label.show', true],
      //     ['series[0].smooth', true],
      //     ['series[0].label.position', 'top'],       
      //     ['series[1].type', 'line'],
      //     ['series[1].label.show', true],
      //     ['series[1].yAxisIndex', '1'],
      //     ['series[1].smooth', true],      
      //   ]
      // },
      // chart3: {
      //   chartOption: [
      //     ['dataset.source', ChartApi.hoursData],
      //     ['title.text', 'ICT Fail Root cause distrlbution(Total output 117pcs)'],
      //     ['title.left', '1%'],
      //     ['title.top', '1%'],
      //     ['color', ['red', 'green', 'yellow']],
      //     ['legend.show', true],
      //     ['legend.top', '9%'],
      //     ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
      //     ['toolbox.show', true],
      //     ['xAxis.axisLabel.show', true],
      //     ['yAxis.axisLabel.show', true],
      //     ['grid.left', '2%'],
      //     ['grid.bottom', '5%'],
      //     ['grid.right', '3%'],
      //     ['grid.top', '20%'],

      //     ['series[0].type', 'bar'],
      //     ['series[0].label.show', true],
      //     ['series[0].smooth', true],         
      //     ['series[1].type', 'bar'],
      //     ['series[1].label.show', true],
      //     ['series[1].smooth', true],
      //     ['series[2].type', 'line'],
      //     ['series[2].label.show', true],
      //     ['series[2].smooth', true],         
      //   ]
      // },
      // chart4: {
      //   chartOption: [
      //     ['dataset.source', ChartApi.hoursData],
      //     ['title.text', 'Top 10 FT Fail Root Cause 278(Total Output 315)'],
      //     ['title.left', '1%'],
      //     ['title.top', '1%'],
      //     ['color', ['red', 'green']],
      //     ['legend.show', true],
      //     ['legend.top', '9%'],
      //     ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
      //     ['toolbox.show', true],
      //     ['xAxis.axisLabel.show', true],
      //     ['yAxis.axisLabel.show', true],
      //     ['grid.left', '2%'],
      //     ['grid.bottom', '5%'],
      //     ['grid.right', '3%'],
      //     ['grid.top', '20%'],

      //     ['series[0].type', 'bar'],
      //     ['series[0].label.show', true],
      //     ['series[0].smooth', true],         
      //     ['series[1].type', 'bar'],
      //     ['series[1].label.show', true],
      //     ['series[1].smooth', true],
      //     ['series[2].type', 'line'],
      //     ['series[2].label.show', true],
      //     ['series[2].smooth', true],           
      //   ]
      // }                
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
    background-color #C6D9F1
    border-radius 5px
</style>