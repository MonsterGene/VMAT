<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout
      row
      wrap
      align-center
    >
      <v-widget>
          <div slot="widget-content">
            <div
              id="chart"
            ></div>
          </div>
        </v-widget>
    </v-layout>
  </v-container>
</template>

<script>
import { airConApi } from '../api';
import VWidget from '@/components/VWidget';
const echarts = window.echarts || undefined;
export default {
  components: {
    VWidget
  },
  data () {
    
    
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        coordinateSystem: 'polar',
        data: data,
        type: 'line'
      }],
    };
  },
  mounted () {
    const myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption(option);
  },
};
</script>

<style lang="stylus" scoped>
</style>
