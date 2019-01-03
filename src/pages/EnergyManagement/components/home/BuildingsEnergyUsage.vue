<template>
<simple-chart
  :title="title"
  series-type="bar"
  :stack="true"
  :dataset-source="chartData"
  :legend-list="['动力', '照明', '空调主机', '空调风柜']"
  :custom-tooltip="DefaultChartTooltip"
  y-name="用电量(KWH)"
  :colors="['#3ac0a9', '#4e7af3', '#515151', '#f7a35c']"
  bg-color="#FFF"
  :height="height"
  @click="chartClick"
></simple-chart>
</template>

<script>
import moment from 'moment';
import { homeApi } from '../../api';
import { energyManageMixin } from '../../mixin.js';
import SimpleChart from '../../../../components/chart/SimpleChart.vue';
import { DefaultChartTooltip } from '../common/ChartTooltip';

export default {
  components: { SimpleChart },
  mixins: [energyManageMixin],
  props: ['height', 'width', 'title'],
  data () {
    return {
      DefaultChartTooltip,
      chartData: {}
    };
  },
  mounted () {
    this.getChartData();
  },
  methods: {
    chartClick () {
      if (this.$route.path.indexOf('/public') !== 0) {
        this.$router.push('/energy_management/floors');
      } else {
        this.$router.push('/public/energy_management/floors');
      }
    },
    getChartData () {
      homeApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD')
      })).then(res => {
        if (res && res.status === 200) {
          this.chartData = res.data;
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>