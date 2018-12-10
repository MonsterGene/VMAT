<template>
  <v-widget :title="title">
    <div slot="widget-content" fluid>
      <e-chart
      ref="chart"
      :path-option="[
        ['dataset.source', chartData],
        ['grid.left', '1%'],
        ['grid.right', '1%'],
        ['grid.bottom', '1%'],
        ['legend.show', true],
        ['color', [color.red.base, color.teal.base, color.pink.base, color.indigo.base]],
        ['toolbox.show', true],
        ['xAxis.axisLabel.show', true],
        ['xAxis.axisLabel.rotate', 20],
        ['yAxis.axisLabel.show', true],
        ['yAxis', [{'position': 'left'}, {'name': 'Yield', 'position': 'right', 'min': 0, 'max': 100, 'axisLabel': {formatter : '{value}%'}}]],
        
        ['series[0].type', 'line'],
        ['series[0].yAxisIndex', 1],
        ['series[0].label.show', true],
        ['series[0].smooth', true],
        ['series[0].label.position', 'top'],

        ['series[1].type', 'bar'],
        ['series[1].label.show', true],
        ['series[1].label.position', 'top'],
        ['series[2].type', 'bar'],
        ['series[2].label.show', true],
        ['series[2].label.position', 'top'],
        ['series[3].type', 'bar'],
        ['series[3].label.show', true],
        ['series[3].label.position', 'top'],
      ]"
      height="350px"
      width="100%"
      >
      </e-chart>   
    </div>
  </v-widget>    
</template>

<script>
import EChart from './echart';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';

export default {
  name: 'yield-chart',
  components: {
    EChart,
    VWidget
  },
  props: ['title', 'chartData'],
  data () {
    return {
      color: Material,
      chartInstance: null,
    };
  },
  mounted () {
    this.chartInstance = this.$refs.chart.chartInstance;
  }
};
</script>

<style lang='stylus' scoped>
</style>