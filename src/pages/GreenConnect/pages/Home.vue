<template>
<v-container grid-list-xl fluid>
<div id="header" class="primary">
  <input class="primary lighten-2" type="button" value="电" />
  <input class="primary lighten-2" type="button" value="水" />
  <input class="primary lighten-2" type="button" value="气" />
</div>
<v-layout row wrap>
  <v-flex md8>
    <img src="../static/pics/u44.png" width="100%" height="100%">
  </v-flex>
  <v-flex md4>
    <v-widget title="NSDI电能消耗" :content-bg="$vuetify.theme.primary">
        <div slot="widget-content">
            <e-chart
            ref="yunxingshijian"
            :path-option="[
              ['dataset.source', barDateChart],
              ['color', ['#454998', '#914d97', '#dc4b98', '#edab82']],
              ['legend.show', true],
              ['legend.textStyle.color', 'rgba(255, 255, 255, .54)'],
              ['toolbox.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['xAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.show', true],
              ['yAxis.axisLine.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisTick.lineStyle.color', 'rgba(255, 255, 255, .54)'],
              ['yAxis.axisLabel.color', 'rgba(255, 255, 255, .54)'],

              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],

              ['series[0].type', 'bar'],
              ['series[0].label.show', true],
              ['series[0].smooth', true],
              ['series[0].stack', 1],
              ['series[0].label.position', 'top']
          
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
/**
 * import { demoApi, pageApi } from '../api';
 * fetch legends data 使用api接口代码示例
 * pageApi.lineApi.getStateLegends().then(response => {
 *   //你的处理程序
 *   //response 是请求的响应信息 response
 *   //后台实际返回的数据 res.data
 * });
 */
import { barDateChart } from '../api';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    EChart,
    VWidget
  },
  data () {
    return {
      barDateChart
    };
  }
};
</script>

<style lang='stylus' scoped>
#header
  width: 100%;
  height: 40px;
  input
    width: 100px;
    height: 30px;
    margin: 15px;
    margin-top: 5px;
    color: #FFFFFF;
    margin-left: 50px;
</style>