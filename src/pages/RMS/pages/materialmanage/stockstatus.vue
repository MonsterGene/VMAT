<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>      
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart5.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart6.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart7.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart8.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart9.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart10.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart11.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart12.chartOption"
        height="350px"
        width="100%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart13.chartOption"
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
// import {ChartApi1} from '@/components/chart/echart1';
import { ChartApi } from '../../api/index';
import EchartAPI from '../../api/materialmanage';
const API = { ChartApi };

export default {
  components: {
    EChart
  },  
  data () {
    return {
      expandss: [true],
      color: ['red'],
      chart5: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart5],
          ['title.text', '各處維修庫存金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],    // 定义标题字体颜色
          ['color', ['#4F81BD', 'green', 'yellow', 'blue', 'red', '#9C27B0', '#F33958']],
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          // ['toolbox.show', true],
          ['xAxis.axisLine.show', false],
          ['yAxis.axisLine.show', false],  // 在echarts中，去掉X轴、Y轴和网格线，只留数据图形
          ['grid.left', '1%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'pie'],
          ['series[0].center', ['50%', '60%']],    // 设置图的上下左右的位置
          ['series[0].radius', ['30%', '50%']],      // 定义设置图的大小
          ['series[0].label.show', true],
          ['series[0].smooth', true],              // 定义平滑度
          ['series[0].label.formatter', '{c}']     // 定义数值是否显示

        ]
      },
      chart6: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart6],
          ['title.text', '各處庫存前五大料號金額匯總（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#4F81BD', 'green', 'yellow']],
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
        ]
      },
      chart7: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGI每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart8: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGII每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart9: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGIII每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart10: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGV每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart11: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGVI每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart12: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGVII每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
        ]
      },
      chart13: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGVII每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#F34941']],
          ['color', ['#EB786C', '#002060']],
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
          ['series[0].type', 'line'],
          ['series[0].label.show', true],
          ['series[0].smooth', false],
          ['series[1].type', 'line'],
          ['series[1].label.show', true],
          ['series[1].smooth', false],
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