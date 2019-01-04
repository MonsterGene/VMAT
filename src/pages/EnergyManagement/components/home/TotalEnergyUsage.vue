<template>
<v-widget :title="department + ' 电能消耗'" header-bg="blue accent-2" header-dark>
  <div
    slot="widget-content"
    class="first-panel"
  >
    <v-layout row wrap class="first-panel-top">
      <v-flex xs5>
        监测单位 <span class="grey-text">{{ department }}</span>
      </v-flex>
      <v-flex xs7>
        累计电能耗 <span class="grey-text">{{ totalEnergyUsageText }}</span>
      </v-flex>
      <v-flex xs5>
        同比升降 <span class="grey-text">{{ YOY }} % <span class="gcem-arrow-up"></span></span>
      </v-flex>
      <v-flex xs7>
        环比升降 <span class="grey-text">{{ MOM }} % <span class="gcem-arrow-down"></span></span>
      </v-flex>
      <v-flex class="watch-point-wrapper" xs12>
        监测点 
        <span class="watch-point-list" v-for="(p, i) in watchPointList" :key="p.name">
          <span v-if="i > 0">/</span><span class="watch-point-item" :class="{'watch-active': p.isWatched}">{{ p.name }}</span>
        </span>
      </v-flex>
      <v-flex xs12>
        采集数据 <span class="grey-text">{{ dataCount }} 个</span>
      </v-flex>
    </v-layout>
    <energy-guage :value="totalEnergyUsage" :max="10000000"></energy-guage>
  </div>
</v-widget>
</template>

<script>
import moment from 'moment';
import { homeApi } from '../../api';
import { energyManageMixin } from '../../mixin.js';
import VWidget from '../../../../components/VWidget.vue';
import EnergyGuage from '../common/EnergyGuage.vue';

const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    EnergyGuage
  },
  mixins: [energyManageMixin],
  data () {
    return {
      department: 'NSD1',
      totalEnergyUsage: 0,
      YOY: 45,
      MOM: 45,
      watchPointList: [
        { name: 'E5', isWatched: true },
        { name: 'E6', isWatched: false },
        { name: 'D9', isWatched: false },
        { name: 'D10', isWatched: false },
        { name: 'F21', isWatched: false }
      ],
      dataCount: 500
    };
  },
  computed: {
    totalEnergyUsageText () {
      return this.totalEnergyUsage >= 100000 ? (this.totalEnergyUsage / 1000000).toFixed(2) + ' M·KWH' : Number(this.totalEnergyUsage).toFixed(2) + ' KWH';
    }
  },
  mounted () {
    this.getChartData();
  },
  methods: {
    getChartData () {
      homeApi.homeFistChart(this.simpleParseParams({
        startTime: moment().subtract('days', 5).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data['总耗电'];
          this.totalEnergyUsage = Number(data);
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
.gcem-arrow-up {
  color: #ff3366;
}
.gcem-arrow-down {
  color: #00cc66;
}
.first-panel
  height 350px
  .first-panel-top
    .grey-text
      color #666
    .watch-point-wrapper
      .watch-point-list
        .watch-point-item
          color: #bcbcbc
          &.watch-active
            color: #7094f5
</style>