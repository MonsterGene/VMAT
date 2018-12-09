<template>
  <v-widget :title="title">
    <v-btn icon slot="widget-header-action" @click="freshData">
      <v-icon class="text--secondary">refresh</v-icon>
    </v-btn>
    <div slot="widget-content">
        <e-chart 
        ref="chart"
        :path-option="[
          ['dataset.source', chartData],
          ['series[0].name', name],
          ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
          ['legend.show', false],
          ['legend.orient', 'horizontal'],
          ['legend.y', 'top'],
          ['xAxis.show', false],
          ['yAxis.show', false],          
          ['series[0].type', 'pie'],
          ['series[0].center', ['50%', '50%']],         
          ['series[0].label.show', true],         
          ['series[0].label.formatter', ' {b}' + '\n' +'{@[1]} ({d}%)'],         
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
  components: {
    EChart,
    VWidget
  },
  props: ['title', 'name', 'chartData'],
  data () {
    return {
      color: Material,
      chartInstance: null,
    };
  },
  mounted () {
    this.chartInstance = this.$refs.chart.chartInstance;
  },
  methods: {
    freshData () {
      this.$emit('needFreshData');
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>