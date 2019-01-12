<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>      
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        ref="bingtu"
        :path-option="chart5.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart6.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart7.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart8.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart9.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart10.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart11.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart12.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
    </v-flex>
    <v-flex lg4 sm4 xs4>         
      <e-chart class="echarts"
        :path-option="chart13.chartOption"
        height="350px"
        width="110%"
        >
      </e-chart>
      <motaikuang v-model="dialog">
        <!-- <v-layout row wrap> 
          <v-flex lg12 sm12 xs12> -->
            <e-chart class="echarts"
              ref="mfg1"
              slot="content"
              :path-option="chart17Option"
              height="280px"
              width="100%"
              >
            </e-chart>
            <e-chart class="echarts"
              ref="mfg2"
              slot="content"
              :path-option="chart18Option"
              height="300px"
              width="100%"
            >
            </e-chart>
          <!-- </v-flex>
          <v-flex lg12 sm12 xs12> -->        
            <e-chart class="echarts"
              ref="mfg3"
              slot="content"
              :path-option="chart19Option"
              height="300px"
              width="100%"
              >
            </e-chart>
             <v-btn 
                ref="mfg4"
                slot="content"
                color="blue" 
                href="" 
                dark
              >
              查询更多
            </v-btn>
          <!-- </v-flex>
        </v-layout>  -->
      </motaikuang>
    </v-flex>
  </v-layout>  
</v-container>
</template>

<script>
import EChart from '@/components/chart/echart';
import { ChartApi } from '../../api/index';
import EchartAPI from '../../api/materialmanage';
import motaikuang from '../../component/MTK.vue';
const API = { ChartApi };

export default {
  components: {
    motaikuang,
    EChart
  }, 
  // mixins: [globalMixin], 
  data () {
    return {
      echartvalue: '',
      dialog: false,
      expandss: [true],
      color: ['#013d5a'],
      title: '',
      chart5: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart5],
          ['title.text', '各處維修庫存金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#05B5FF']],      // 定义标题字体颜色
          ['color', ['#FBA200', '#00DC58', 'yellow', '#00CEFF', '#37FD23', '#F90F9B', '#05B5FF']],
          ['backgroundColor', ['#282A30']],          
          ['legend.show', true],
          ['legend.top', '9%'],
          ['legend.textStyle.color', ['#FFFFFF']],     
          ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
          // ['toolbox.show', true],
          ['xAxis.axisLine.show', false],
          ['yAxis.axisLine.show', false],    // 在echarts中，去掉X轴、Y轴和网格线，只留数据图形
          ['xAxis.axisLabel.textStyle.color', ['#9faeb5']],      
          ['yAxis.axisLabel.textStyle.color', ['#9faeb5']],
          ['xAxis.axisLine.lineStyle.color', ['#4d4d4d']],             
          ['yAxis.axisLine.lineStyle.color', ['#4d4d4d']],
          ['grid.left', '1%'],
          ['grid.bottom', '5%'],
          ['grid.right', '3%'],
          ['grid.top', '20%'],
          ['series[0].type', 'pie'],
          ['series[0].center', ['50%', '60%']],       // 设置图的上下左右的位置
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#55F9E0']],
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
          ['series[0].smooth', true],
          ['series[0].itemStyle.normal.label.show', true],
          ['series[0].itemStyle.normal.label.position', 'top'],
        ]
      },
      chart7: {
        chartOption: [
          ['dataset.source', ChartApi.wipChart7],
          ['title.text', 'MFGI每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
          ['title.text', 'MFGVIII每月庫存總金額（K台幣）'],
          ['title.left', '1%'],
          ['title.top', '1%'],
          ['title.textStyle.color', ['#05B5FF']],
          ['color', ['#00CEFF', '#73FB79']],
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
  computed: {
    chart17Option () { //  餅圖的第二層餅圖
      return [ 
        ['dataset.source', this.chart17Data()],
        ['title.text', this.title + '維修庫存物料狀態'],
        ['title.left', '1%'],
        ['title.top', '1%'],
        ['title.textStyle.color', ['#05B5FF']],      // 定义标题字体颜色
        ['color', ['#1E90FF', '#00FF00', '#FF0000']],
        ['backgroundColor', ['#282A30']],          
        ['legend.show', true],
        ['legend.top', '40%'],
        ['legend.orient', 'vertical'],
        ['legend.left', 'left'],
        ['legend.textStyle.color', ['#FFFFFF']],     
        ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
        // ['toolbox.show', true],
        ['xAxis.axisLine.show', false],
        ['yAxis.axisLine.show', false],    // 在echarts中，去掉X轴、Y轴和网格线，只留数据图
        ['grid.left', '1%'],
        ['grid.bottom', '5%'],
        ['grid.right', '3%'],
        ['grid.top', '20%'],
        ['series[0].type', 'pie'],
        ['series[0].center', ['50%', '50%']],       // 设置图的上下左右的位置
        ['series[0].radius', ['0', '75%']],      // 定义设置图的大小
        ['series[0].label.show', true],
        ['series[0].smooth', true],              // 定义平滑度
        ['series[0].label.formatter', '{c}']     // 定义数值是否显示
      ];
    },
    chart18Option () {
      return [
        ['dataset.source', this.chart18Data()],
        ['title.text', this.title + '維修庫存金額前10大料號'],
        ['title.left', '1%'],
        ['title.top', '1%'],
        ['title.textStyle.color', ['#05B5FF']],
        ['color', ['#2CFE4F']],
        ['backgroundColor', ['#282A30']],
        ['legend.show', true],
        ['legend.top', '9%'],
        ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
        ['legend.textStyle.color', ['#FFFFFF']],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisLabel.rotate', '60'],
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
        ['series[0].smooth', true],
        ['series[0].itemStyle.normal.label.show', true],
        ['series[0].itemStyle.normal.label.position', 'top'],
      ];
    },
    chart19Option () {
      return [
        ['dataset.source', this.chart19Data()],
        ['title.text', this.title + '維修庫存數量前10大料號'],
        ['title.left', '1%'],
        ['title.top', '1%'],
        ['title.textStyle.color', ['#05B5FF']],
        ['color', ['#2CFE4F']],
        ['backgroundColor', ['#282A30']],
        ['legend.show', true],
        ['legend.top', '9%'],
        ['legend.selected', { 'Rate 2': false, 'Rate 3': false, 'Num 2': false, 'Num 3': false }],
        ['legend.textStyle.color', ['#FFFFFF']],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisLabel.rotate', '60'],
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
        ['series[0].smooth', true],
        ['series[0].itemStyle.normal.label.show', true],
        ['series[0].itemStyle.normal.label.position', 'top'],
      ];
    },
   
  },
  mounted () {
    this.$refs.bingtu.chartInstance.on('click', evt => {
      console.log(evt.name);
      this.title = evt.name;
      console.log(evt.data[1]);
      this.echartvalue = evt.value;
      this.dialog = true;
      this.$nextTick(() => {                             //  对dialog里的数据异步渲染
        this.$refs.mfg1.update();                        //  再次刷新
        this.$refs.mfg2.update();
        this.$refs.mfg3.update();
        this.$refs.mfg1.chartInstance.resize();                          //  对dialog里的数据异步渲染
        this.$refs.mfg2.chartInstance.resize();                          //  对dialog里的数据异步渲染
        this.$refs.mfg3.chartInstance.resize();
        this.$refs.mfg4.chartInstance.resize();
      });
    });
  },
  methods: {
    chart17Data () {
      return ChartApi.wipChart17;
    },
    chart18Data () {
      return ChartApi.wipChart18;
    },
    chart19Data () {
      return ChartApi.wipChart19;
    },
  },
};
</script>

<style lang='stylus' scoped>
  .echarts
    background-color #FFF
    border-radius 5px
</style>