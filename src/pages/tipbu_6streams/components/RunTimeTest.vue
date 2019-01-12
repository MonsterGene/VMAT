<template>
<v-widget :title="'運行時間('+ stationName +')'" :content-bg="$vuetify.theme.primary" :header-bg="$vuetify.theme.primary">
  <div slot="widget-header-action" style="width:380px;display:flex;height:100%">
    <div style="width:120px;">
      <v-select
        :items="lineList"
        label="线别选择"
        solo
        v-model="lineId"
      ></v-select>
    </div>
    <v-menu
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      style="flex:1"
    >
      <v-text-field
        slot="activator"
        v-model="startDate"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="startDate"></v-date-picker>
    </v-menu>
    <v-menu
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      style="flex:1"
    >
      <v-text-field
        slot="activator"
        v-model="endDate"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="endDate"></v-date-picker>
    </v-menu>
  </div>
  <div slot="widget-content">
      <e-chart
      ref="runtime"
      :path-option="[
        ['dataset.source', chartData],
        ['color', ['#54BE35', '#4496EC', '#FFC000']],//run,standy,error '#dc4b98',unready=>run,wait,
        ['legend.show', true],
        //['legend.selected', {}],
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
        ['grid.tooltip.trigger', 'axis'],
        ['grid.tooltip.axisPointer.type', 'shadow'],

        ['series[0].type', 'bar'],
        ['series[0].label.show', false],
        ['series[0].label.formatter', labelFormatter],
        ['series[0].smooth', true],
        ['series[0].stack', 1],
        ['series[0].label.position', 'top'],
        
        ['series[1].type', 'bar'],
        ['series[1].label.show', false],
        ['series[1].label.formatter', labelFormatter],
        ['series[1].smooth', true],
        ['series[1].stack', 1],
        ['series[1].label.position', 'top'],

        ['series[2].type', 'bar'],
        ['series[2].label.show', false],
        ['series[2].label.formatter', labelFormatter],
        ['series[2].smooth', true],
        ['series[2].stack', 1],
        ['series[2].label.position', 'top'],
      ]"
      height="400px"
      width="100%"
      >
      </e-chart>     
  </div>
</v-widget>
</template>

<script>
import moment from 'moment';
import { stationApi } from '../api';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    EChart,
    VWidget
  },
  props: ['stationName', 'lineId', 'stationId'],
  data () {
    return {
      startDate: moment().subtract('months', 1).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      chartData: { date: [] },
      typeList: [
        { key: 'run', value: '运行' },
        { key: 'wait', value: '等待' },
        { key: 'stop', value: '停止' }
      ],
      lineList: [
        { text: '测试1线', value: 1 },
        { text: '测试2线', value: 2 },
        { text: '测试3线', value: 3 }
      ]
    };
  },
  watch: {
    startDate () {
      this.getChartData();
    },
    endDate () {
      this.getChartData();
    },
  },
  mounted () {
    this.getChartData();
  },
  methods: {
    labelFormatter (item) {
      console.log(item);
      const val = item.value[item.seriesIndex + 1];
      if (Number(val) === 0) {
        return '';
      } else {
        return val;
      }
    },
    getChartData () {
      // console.log(API.dailyData2(this.startDate, this.endDate));
      stationApi.getRunTime({
        startTime: this.startDate,
        endTime: this.endDate,
        lineID: this.lineId,
        areaID: this.stationId
      }).then(res => {
        const data = res.data;
        console.log(data);
        if (data.success) {
          const dataKeys = Object.keys(data.data);
          const cData = {};
          dataKeys.forEach(key => {
            const keyMap = this.typeList.filter(v => v.key === key)[0];
            if (keyMap) {
              cData[keyMap.value] = data.data[key];
            } else {
              cData[key] = data.data[key];
            }
          });
          this.chartData = cData;
          this.$nextTick(() => {
            this.$refs.runtime.update();
          });
        } else {
          console.log('Get runtime data fail!');
        }
      });
    }
  },
};
</script>

<style lang='stylus' scoped>

</style>