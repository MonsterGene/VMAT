<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>      
    <v-flex lg6 sm6 xs6>         
      <e-chart class="echarts"
        :path-option="chart14.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg6 sm6 xs6>         
      <e-chart class="echarts"
        :path-option="chart15.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg12 sm12 xs12>         
      <e-chart class="echarts"
        :path-option="chart16.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
      <motaikuang>
        
      </motaikuang>
    </v-flex>
  </v-layout>  
</v-container>
</template>

<script>
import EChart from '@/components/chart/echart';
// import {ChartApi1} from '@/components/chart/echart1';
import { ChartApi } from '../../api/index';
import EchartAPI from '../../api/materialmanage';
import motaikuang from './stockMTK.vue';
const API = { ChartApi };

export default {
  components: {
    EChart
  },  
  data () {
    return {
      expandss: [true],
      color: ['#013d5a'],
      chart14: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart14],
          ['title.text', 'By月報廢數量統計'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['backgroundColor', ['#282A30']],
          ['color', ['#2CFE4F']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['legend.textStyle.color', ['#FFFFFF']],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['xAxis.axisLabel.textStyle.color', ['#9faeb5']],      
          ['yAxis.axisLabel.textStyle.color', ['#9faeb5']],
          ['xAxis.axisLine.lineStyle.color', ['#4d4d4d']],             
          ['yAxis.axisLine.lineStyle.color', ['#4d4d4d']],
          ['yAxis.splitLine.lineStyle.color', ['#4d4d4d']],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
        ]
      },
      chart15: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart15],
          ['title.text', 'By月份報廢金額'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['backgroundColor', ['#282A30']],
          ['color', ['#00EBFF']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['legend.textStyle.color', ['#FFFFFF']],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['xAxis.axisLabel.textStyle.color', ['#9faeb5']],      
          ['yAxis.axisLabel.textStyle.color', ['#9faeb5']],
          ['xAxis.axisLine.lineStyle.color', ['#4d4d4d']],             
          ['yAxis.axisLine.lineStyle.color', ['#4d4d4d']],
          ['yAxis.splitLine.lineStyle.color', ['#4d4d4d']],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
        ]
      },
      chart16: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart16],
          ['title.text', '前五大金額分佈狀況'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#12C7FF', '#2CFE4F', '#FF6B00']],
          ['backgroundColor', ['#282A30']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          ['legend.textStyle.color', ['#FFFFFF']],
          ['toolbox.show', true],
          ['xAxis.axisLabel.show', true],
          ['yAxis.axisLabel.show', true],
          ['xAxis.axisLabel.textStyle.color', ['#9faeb5']],      
          ['yAxis.axisLabel.textStyle.color', ['#9faeb5']],
          ['xAxis.axisLine.lineStyle.color', ['#4d4d4d']],             
          ['yAxis.axisLine.lineStyle.color', ['#4d4d4d']],
          ['yAxis.splitLine.lineStyle.color', ['#4d4d4d']],
          ['grid.left', '2%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'bar'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'bar'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
          ['series[2].type', 'bar'],
          ['series[2].label.show', true],
          ['series[2].smooth', false],
        ]
      },
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