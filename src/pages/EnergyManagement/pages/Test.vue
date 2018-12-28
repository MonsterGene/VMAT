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
              style="width:400px;height:300px"
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
      chartOption: {
      }
    };
  },
  mounted () {
    const myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    });
  },

};
</script>

<style lang="stylus" scoped>
</style>
