<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout row wrap>
      <v-flex xs-12>
        <floor-map></floor-map>
      </v-flex>
    </v-layout>
  <v-layout>
    <v-flex md8>
      <img src="../../assets/pics/u652.png" width="100%" height="450px"/>
    </v-flex>
    <v-flex md4>
      <simple-chart
        title="各楼层电能能耗"
        series-type="bar"
        :stack="true"
        :dataset-source="floorsTypeEnergyData"
        :legend-list="['动力', '照明', '空调主机', '空调风柜']"
        :custom-tooltip="DefaultChartTooltip"
        y-name="用电量(KWH)"
        :colors="['#3ac0a9', '#4e7af3', '#515151', '#f7a35c']"
        bg-color="#FFF"
        height="230px"
      ></simple-chart>
      <energy-type-pie title="各电能类型能耗占比" :chart-data="typeEnergyData" building="E515" width="100%" height="230px"></energy-type-pie>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import { floorsApi } from '../../api';
import { deepCopyObject } from '../../../../util/utils';
import { energyManageMixin } from '../../mixin.js';
import BuildingsEnergyUsage from '../../components/home/BuildingsEnergyUsage.vue';
import EnergyTypePie from '../../components/home/EnergyTypePie.vue';
import FloorMap from '../../components/Floors/FloorMap.vue';
import SimpleChart from '../../../../components/chart/SimpleChart.vue';
import { ChartTooltip, defaultTooltipOption } from '../../components/common/ChartTooltip';

const defTooltipOpt = deepCopyObject(defaultTooltipOption);
defTooltipOpt.formatter.countTotal = {
  show: true,
  name: '总耗电',
};
const DefaultChartTooltip = ChartTooltip(defTooltipOpt);

const echarts = window.echarts || undefined;

export default {
  name: 'floor',
  components: {
    FloorMap,
    BuildingsEnergyUsage,
    EnergyTypePie,
    SimpleChart
  },
  mixins: [energyManageMixin],
  data: vm => ({
    floorsTypeEnergyData: {},
    typeEnergyData: true,
    DefaultChartTooltip
  }),
  mounted () {
    this.getChart2();
    this.getChart3();
  },
  methods: {
    getChart2 () {
      floorsApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
          this.floorsTypeEnergyData = res.data;
        }
      });
    },
    getChart3 () {
      floorsApi.buildingTypeEnergy(this.simpleParseParams({
        startTime: moment().subtract('days', 5).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E515'
      })).then(res => {
        if (res && res.status === 200) {
          console.log(res.data);
          this.typeEnergyData = res.data;
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
#select{
  padding:10px
}
</style>
