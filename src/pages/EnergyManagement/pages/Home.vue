<template>
  <v-container
    grid-list-xl
    fluid
    v-resize="onWindowResize"
    class="gcem-home"
  >
    <source-type-bar></source-type-bar>
    <v-layout
      row
      wrap
      fill-height
      justify-end
      align-space-around
      class="gcem-home-form-bar"
    >
      <v-flex class="date-control">
        <v-menu
          ref="menu1"
          class="border-radius-24"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Solo"
            persistent-hint
            placeholder="开始时间"
            solo
            hide-details
          ></v-text-field>
          <v-date-picker no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="date-control">
        <v-menu
          ref="menu2"
          class="border-radius-24"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Solo"
            persistent-hint
            placeholder="结束时间"
            solo
            hide-details
          ></v-text-field>
          <v-date-picker no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex class="gcem-home-form-select-wrapper">
        <v-select
          class="border-radius-24"
          label="班别："
          dense
          solo
          hide-details
        ></v-select>
      </v-flex>
      <v-flex class="btn-group-wrapper">
        <v-btn-toggle class="btn-group">
          <v-btn flat value="days" class="sub-btn btn-border-r">
            日
          </v-btn>
          <v-btn flat value="months" class="sub-btn btn-border-r">
            月
          </v-btn>
          <v-btn flat value="quater" class="sub-btn btn-border-r">
            季度
          </v-btn>
          <v-btn flat value="year" class="sub-btn">
            年
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex style="flex: 0 0 128px;width: 128px;">
        <v-btn color="primary">查询</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8>
        <layout-map></layout-map>
      </v-flex>
      <v-flex md4>
        <total-energy-usage :w-size="wSize"></total-energy-usage>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex md3>
        <buildings-energy-usage :w-size="wSize" width="100%" height="330px" title="各楼栋电能消耗"></buildings-energy-usage>
      </v-flex>
      <v-flex md3>
        <energy-type-pie :w-size="wSize" title="NSD1各电力类型能耗占比" width="100%" height="330px"></energy-type-pie>
      </v-flex>
      <v-flex md3>
        <bu-energy-total-usage :w-size="wSize" title="各BU累计电能耗" width="100%" height="330px"></bu-energy-total-usage>
      </v-flex>
      <v-flex md3>
        <department-energy-trend :w-size="wSize" title="NSD1电能耗趋势" width="100%" height="330px"></department-energy-trend>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * import { demoApi, pageApi } from '../api';
 * fetch legends data 使用api接口代码示例
 * pageApi.lineApi.getStateLegends().then(response => {
 *   //你的处理程序
 *   //response 是请求的响应信息 response
 *   //后台实际返回的数据 res.data
 * });
 */
import moment from 'moment';
import { homeApi } from '../api';
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
import LayoutMap from '../components/home/LayoutMap.vue';
import TotalEnergyUsage from '../components/home/TotalEnergyUsage.vue';
import BuildingsEnergyUsage from '../components/home/BuildingsEnergyUsage.vue';
import EnergyTypePie from '../components/home/EnergyTypePie.vue';
import BuEnergyTotalUsage from '../components/home/BuEnergyTotalUsage.vue';
import DepartmentEnergyTrend from '../components/home/DepartmentEnergyTrend.vue';

const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    SourceTypeBar,
    LayoutMap,
    TotalEnergyUsage,
    BuildingsEnergyUsage,
    EnergyTypePie,
    BuEnergyTotalUsage,
    DepartmentEnergyTrend
  },
  data () {
    return {
      wSize: 0
    };
  },
  // mounted () {},
  methods: {
    onWindowResize () {
      // console.log('window resize');
      // console.log(arguments);
      this.wSize = Date.now();
    },
  }
};
</script>

<style lang='stylus' scoped>
.gcem-home
  .gcem-home-form-bar
    .date-control
      flex 0 0 200px
      width 200px
    .gcem-home-form-select-wrapper
      flex: 0 0 150px
      width: 150px
    .border-radius-24
      border-radius 24px
      border 1px solid #4e7af3
      overflow hidden
    .btn-group-wrapper
      flex 0 0 165px
      width 165px
      align-self center
      .btn-group
        border 1px solid #4e7af3
        border-radius 24px
        height 48px
        .sub-btn
          color #4e7af3
          height 100%
          &.btn-border-r
            border-right: 1px solid #4e7af3
</style>
