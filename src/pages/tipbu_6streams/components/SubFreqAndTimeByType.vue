<template>
<v-layout row>
  <v-flex xs6>
    <v-widget :title="'机故类型次数分析'" :content-bg="$vuetify.theme.primary">
      <div slot="widget-header-action" style="width:260px;display:flex;">
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
          ref="frequencyChart"
          :path-option="frequencyChartOption"
          @chart-click="$emit('chart-click', $event)"
          height="400px"
          width="100%"
          >
        </e-chart>   
      </div>
    </v-widget> 
  </v-flex>
  <v-flex xs6>
      <v-widget :title="'异常类型分析'" :content-bg="$vuetify.theme.primary">
        <div slot="widget-header-action" style="width:260px;display:flex;">
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
            ref="timeChart"
            :path-option="timeChartOption"
            @chart-click="$emit('chart-click', $event)"
            height="400px"
            width="100%"
            >
          </e-chart>              
        </div>
      </v-widget>
    </v-flex>
</v-layout>
</template>

<script>
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';
import yAxisConf from './chartYStyle';
import commChartOpt from './commChartOpt';
import { stationApi } from '../api';
import axios from 'axios';

export default {
  components: { EChart, VWidget },
  props: ['date', 'lineId', 'stationId'],
  data () {
    return {
      startDate: this.date,
      endDate: this.date,
      frequencyChartData: { type: [] },
      timeChartData: { type: [] },
    };
  },
  computed: {
    frequencyChartOption () {
      return [
        ['dataset.source', this.frequencyChartData],
        ['color', ['#73fb79']],
        ['yAxis', yAxisConf],
        ['series[0].type', 'line'],
        ...commChartOpt
      ];
    },
    timeChartOption () {
      return [
        ['dataset.source', this.timeChartData],
        ['color', ['#bfbfbf']],
        ['yAxis', yAxisConf],
        ['series[0].type', 'bar'],
        ...commChartOpt
      ];
    },
  },
  watch: {
    date: {
      handler (val) {
        this.startDate = val;
        this.endDate = val;
        this.getChartData();
      },
      immediate: true
    }
  },
  // mounted () {},
  methods: {
    getChartData () {
      const reqFreq = stationApi.getErrorFrequency.byType({
        startDate: this.startDate,
        endDate: this.endDate,
        lineID: this.lineId,
        areaID: this.stationId
      });
      const reqTime = stationApi.getErrorTime.byType({
        startDate: this.startDate,
        endDate: this.endDate,
        lineID: this.lineId,
        areaID: this.stationId
      });
      axios.all([reqFreq, reqTime]).then(axios.spread((resFreq, resTime) => {
        const freqData = resFreq.data;
        const timeData = resTime.data;
        if (freqData.success) {
          this.frequencyChartData = freqData.data;
          this.$nextTick(() => {
            this.$refs.frequencyChart.update();
          });
        } else {
          console.log('获取异常类型次数失败！');
        }
        if (timeData.success) {
          this.timeChartData = timeData.data;
          this.$nextTick(() => {
            this.$refs.timeChart.update();
          });
        } else {
          console.log('获取异常类型时间失败！');
        }
      }));
    }
  },
};
</script>

<style lang='stylus' scoped>

</style>