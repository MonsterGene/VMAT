<template>
  <v-container
    grid-list-xl
    fluid
  >
    <div
      id="header"
      class="primary"
    >
      <input
        class="primary lighten-2"
        type="button"
        value="电"
      />
      <input
        class="primary lighten-2"
        type="button"
        value="水"
      />
      <input
        class="primary lighten-2"
        type="button"
        value="气"
      />
    </div>
    <v-layout
      row
      wrap
    >
      <v-flex md8>
        <img
          src="../static/pics/u44.png"
          width="100%"
          height="300px"
        >
      </v-flex>
      <v-flex md4>
        <v-widget title="NSDI电能消耗" style="height:100%">
          <div slot="widget-content" style="height:220px;padding-top:60px">
            <v-card>
              <v-card-text class="pa-0">
                <v-container class="pa-0">
                  <div class="layout row ma-0 align-center justify-center">
                    <div class="sm6 xs6 flex">
                      <div class="layout column ma-0 justify-center align-center">
                        <span class="icon-shandianquan"></span>
                      </div>
                    </div>
                    <div class="sm6 xs6 flex text-sm-center py-3 white--text light-blue">
                      <div class="headline">{{ energyData }}</div>
                      <span class="caption">KWH</span>
                    </div>
                  </div>
                </v-container>
              </v-card-text>
            </v-card> 
          </div>
          <!-- <div slot="widget-content">
            <e-chart
              ref="yunxingshijian"
              :path-option="[
                ['series[0].name', '刻度'],
                ['series[0].type', 'gauge'],
                ['series[0].radius', '80%'],
                ['series[0].min', '0'],
                ['series[0].max', '100'],
                ['series[0].endAngle', '0'],
                ['series[0].axisLine.show', false],
                ['series[0].axisLine.lineStyle.width', '1'],
                ['series[0].axisLine.lineStyle.color', ['1', 'rgba(0,0,0,0)']],
                ['series[0].axisLabel.show', true],
                ['series[0].axisLabel.color', '#3B53A2'],
                ['series[0].axisLabel.distance', '15'],
                ['series[0].axisLabel.fontSize', '11'],
                ['series[0].axisLabel.formatter', '{value}'],
                ['series[0].axisTick.show', true],
                ['series[0].axisTick.lineStyle.color.type', 'radial'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '0'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#77C664'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '0.2'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#2CB7C7'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '0.4'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#1DB2DD'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '0.6'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#2D89ED'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '0.8'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#7765B4'],
                ['series[0].axisTick.lineStyle.color.colorStops.offset', '1'],
                ['series[0].axisTick.lineStyle.color.colorStops.color', '#EB3457'],
                ['series[0].axisTick.lineStyle.color.globalCoord', false],
                ['series[0].axisTick.lineStyle.width', '2'],
                ['series[0].axisTick.lineStyle.length', '20'],
                ['series[0].axisTick.length', true],
                ['series[0].splitLine.show', '-5'],
                ['series[0].splitLine.length', '-5'],
                ['series[0].detail.show', false],
                ['series[0].pointer.show', false],
                ['series[1].type', 'gauge'],
                ['series[1].radius', '85%'],
                ['series[1].min', '0'],
                ['series[1].max', '100'],
                ['series[1].center', ['50%', '50%']],
                ['series[1].splitNumber', '0'],
                ['series[1].startAngle', '180'],
                ['series[1].endAngle', '0'],
                ['series[1].axisLine.show', true],
                ['series[1].axisLine.lineStyle.width', '13'],
                ['series[1].axisLine.lineStyle.color', [
                  '0',
                  '1',
                  {
                    colorStops: [
                      {
                        'offset':'0',
                        'color':'#77C664'
                      },
                      { 'offset':'0.2', 'color':'#2CB7C7' },
                      { 'offset':'0.4', 'color':'#1DB2DD' },
                      { 'offset':'0.6', 'color':'#2D89ED' },
                      {'offset':'0.8','color':'#7765B4'},
                      {'offset':'1','color':'#EB3457'}
                    ],
                    global: false,
                    type: 'linear',
                    x: '0',
                    x2: '1',
                    y: '0',
                    y2: '0'
                  }
                ]],
                ['series[1].splitLine.show', false],
                ['series[1].axisLabel.show', false],
                ['series[1].axisTick.show', false],
                ['series[1].detail.show', false],
                ['series[1].detail.offsetCenter', ['0', '0']],
                ['series[1].detail.color', '#ddd'],
                ['series[1].detail.formatter', params => params],
                ['series[1].detail.textStyle.fontSize', '12'],
                ['series[1].data', [{ value: '5' }]]
              ]"
              height="400px"
              width="100%"
            >
            </e-chart> 
          </div>-->
        </v-widget>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex md3>
        <v-widget title="各楼栋电能消耗">
          <div slot="widget-content">
            <e-chart
              ref="yunxingshijian"
              :path-option="[
              ['dataset.source', DemoChartData.barChartDataWeek],
              ['color', 'black'],
              ['legend.show', true],
              //['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.show', true],
              //['yAxis.axisLine.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['yAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],

              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'line'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top']
          
            ]"
              height="200px"
              width="100%"
            >
            </e-chart>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="NSDI各电力类型能耗占比">
          <div slot="widget-content">
            <e-chart
              ref="yunxingshijian"
              :path-option="[
              ['dataset.source', DemoChartData.pieChartDataWeek],
              ['color', ['#454998', '#914d97', '#dc4b98', '#edab82']],
              //['legend.show', true],
              ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              //['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              //['yAxis.axisLabel.show', true],
              
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'pie'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top']
          
            ]"
              height="200px"
              width="100%"
            >
            </e-chart>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="各BU累计电能耗">
          <div slot="widget-content">
            <e-chart
              ref="yunxingshijian"
              :path-option="[
              ['dataset.source', DemoChartData.barChartDataWeek],
              ['color', 'gold'],
              ['legend.show', true],
              ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.show', true],
              //['yAxis.axisLine.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['yAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['yAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],

              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top']
          
            ]"
              height="200px"
              width="100%"
            >
            </e-chart>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="NSDI电能耗趋势">
          <div slot="widget-content">
            <e-chart
              ref="yunxingshijian"
              :path-option="[
              ['dataset.source', DemoChartData.barChartDataWeek],
              ['color', 'red'],
              ['legend.show', true],
              ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              //['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.show', true],
              //['yAxis.axisLine.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              //['yAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],

              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'line'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top']
          
            ]"
              height="200px"
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
/**
 * import { demoApi, pageApi } from '../api';
 * fetch legends data 使用api接口代码示例
 * pageApi.lineApi.getStateLegends().then(response => {
 *   //你的处理程序
 *   //response 是请求的响应信息 response
 *   //后台实际返回的数据 res.data
 * });
 */
import moment from 'moment';
import { DemoChartData, homeApi } from '../api';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
const echarts = window.echarts || undefined;

export default {
  components: {
    EChart,
    VWidget,
    MiniStatistic
  },
  data () {
    return {
      DemoChartData,
      LinearGradient: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: '0',
          color: '#77C664'
        },

        {
          offset: '0.2',
          color: '#2CB7C7'
        },

        {
          offset: '0.4',
          color: '#1DB2DD'
        },

        {
          offset: '0.6',
          color: '#2D89ED'
        },

        {
          offset: '0.8',
          color: '#7765B4'
        },

        {
          offset: '1',
          color: '#EB3457'
        }
      ]),
      energyData: 0
    };
  },
  mounted () {
    const params = new FormData();
    const data = {
      startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      building: 'E515'
    };
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    
    homeApi.homeFistChart(params).then(res => {
      console.log(res);
      const data = res.data;
      if (data.success === 'true') {
        this.energyData = data.data.epnet;
      }
    });
  }
};
</script>

<style lang='stylus' scoped>
#header {
  width: 100%;
  height: 40px;

  input {
    width: 100px;
    height: 30px;
    margin: 15px;
    margin-top: 5px;
    color: #FFFFFF;
    margin-left: 50px;
  }
}

.icon-shandianquan{
  content: url(../static/icons/baseline-flash_on-24px.svg);
  font-size: 24px;
}
</style>
