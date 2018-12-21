<template>
<v-widget :title="'運行時間('+ stationName +')'" :content-bg="$vuetify.theme.primary">
  <div slot="widget-header-action" style="width:380px;display:flex;height:100%">
    <div style="width:120px;">
      <v-select
        :items="['A01', 'A02', 'A03']"
        label="线别选择"
        solo
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
        ['color', ['#454998', '#914d97', '#dc4b98', '#edab82']],
        ['legend.show', true],
        ['legend.selected', {
          'Run 2': false, 'Standy 2': false, 'Error 2': false, 'Unready 2': false,
          'Run 2': false, 'Standy 2': false, 'Error 2': false, 'Unready 2': false,
          'Run 3': false, 'Standy 3': false, 'Error 3': false, 'Unready 3': false
        }],
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
        ['series[0].label.position', 'top'],
        
        ['series[1].type', 'bar'],
        ['series[1].label.show', true],
        ['series[1].smooth', true],
        ['series[1].stack', 1],
        ['series[1].label.position', 'top'],

        ['series[2].type', 'bar'],
        ['series[2].label.show', true],
        ['series[2].smooth', true],
        ['series[2].stack', 1],
        ['series[2].label.position', 'top'],

        ['series[3].smooth', true],
        ['series[3].type', 'bar'],
        ['series[3].label.show', true],
        ['series[3].stack', 1],
        ['series[3].label.position', 'top'],
    
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
import API from '../api/chart';
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    EChart,
    VWidget
  },
  props: ['stationName'],
  data () {
    return {
      startDate: moment().subtract('months', 1).format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      API,
      chartData: { date: [] }
    };
  },
  watch: {
    startDate () {
      this.getChartData();
    },
    endDate () {
      this.getChartData();
    }
  },
  mounted () {
    this.getChartData();
  },
  methods: {
    getChartData () {
      console.log(API.dailyData2(this.startDate, this.endDate));
      this.chartData = API.dailyData2(this.startDate, this.endDate);
      this.$nextTick(() => {
        this.$refs.runtime.update();
      });
    }
  },
};
</script>

<style lang='stylus' scoped>

</style>