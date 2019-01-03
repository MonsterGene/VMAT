<template>
<simple-chart
  :title="title"
  series-type="bar"
  :dataset-source="chartData"
  :custom-tooltip="DefaultChartTooltip"
  y-name="用电量(KWH)"
  :x-axis="{ type: 'category', axisLabel: { interval: 0 }}"
  :colors="['#4e7af3']"
  bg-color="#FFF"
  :height="height"
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
  props: ['title', 'height', 'width'],
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
    getChartData () {
      homeApi.chart3Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      })).then(res => {
        if (res && res.status === 200) {
          this.chartData = res.data;
        }
      });
    }
  }
};
</script>
