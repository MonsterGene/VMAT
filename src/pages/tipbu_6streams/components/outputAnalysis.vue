<template>
<v-widget :title="title" content-bg="#282a30">
  <template slot="widget-header-action">
    <slot name="widget-header-action"></slot>
  </template>
  <div slot="widget-content">
      <e-chart
      ref="chart"
      :path-option="pathOption"
      height="400px"
      width="100%"
      >
      </e-chart>     
  </div>
</v-widget>
</template>

<script>
import EChart from '@/components/chart/echart';
import VWidget from '@/components/VWidget';

export default {
  components: {
    EChart,
    VWidget
  },
  props: ['title', 'pathOption'],
  data () {
    return {
      chartInstance: null
    };
  },
  mounted () {
    this.chartInstance = this.$refs.chart.chartInstance;
  }
};
</script>

<style lang='stylus' scoped>

</style>