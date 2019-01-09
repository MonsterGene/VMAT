<template>
  <v-container
    grid-list-xl
    fluid
  >
    <source-type-bar></source-type-bar>
    <v-layout
      row
      wrap
      justify-end
      align-center
    >
      <v-flex md3>
        <v-layout row wrap>
          <v-flex md6 class="text-xs-center">
            <v-btn round @click="machineSwitch(0)" :input-value="machineType === 0">空调主机</v-btn>
          </v-flex>
          <v-flex md6 class="text-xs-center">
            <v-btn round @click="machineSwitch(1)" :input-value="machineType === 1">空调风柜</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md9>
        <search-bar @condition-change="searchBarChange"></search-bar>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex md4>
        <v-widget :title="machineType ? '空调风柜总能耗' : '空调主机总能耗'">
          <div slot="widget-content">
            <energy-guage title="" :value="acHostTotalEnergy" :max="1000000" height="200px"></energy-guage>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md8>
        <line-chart
          :title="machineType ? '当月每日空调风柜能耗' : '当月每日空调主机能耗'"
          :dataset-source="acHostEnergyUsageByDay"
          :custom-tooltip="chartTooltipOpt('default')"
          colors="#6699ff"
          bg-color="#FFF"
          height="280px"></line-chart>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex md3 v-for="(aircon, index) in airconList" :key="index">
        <air-con-status @select="airconSelect" :aircon-info="aircon" :current-type="machineType" :current-aircon="currentAirCon"></air-con-status>
      </v-flex>
    </v-layout>
    <v-layout v-if="currentAirCon && airconList.length > 0" row wrap align-center>
      <v-flex md6>
        <line-chart
          title="电压走势"
          :dataset-source="airconVoltageTrendData"
          :custom-tooltip="chartTooltipOpt('V')"
          :y-axis="{
            name: '电压(V)',
            max: v => takeInt(v.max + 1, true),
            min: v => takeInt(v.min - 1)
          }"
          :colors="['#e3d842', '#66cc33', '#e75c12']"
          bg-color="#FFF"
          x-name="时间"
          height="300px"></line-chart>
      </v-flex>
      <v-flex md6>
        <line-chart
          title="电流走势"
          :dataset-source="airconIntensityTrendData"
          :custom-tooltip="chartTooltipOpt('A')"
          :y-axis="{
            name: '电流(A)',
            max: v => takeInt(v.max + 1, true),
            min: v => takeInt(v.min - 1)
          }"
          :colors="['#e3d842', '#66cc33', '#e75c12']"
          bg-color="#FFF"
          y-name=""
          x-name="时间"
          height="300px"></line-chart>
      </v-flex>
      <v-flex md6>
        <line-chart
          title="功率走势"
          :dataset-source="airconPowerTrendData"
          :custom-tooltip="chartTooltipOpt('KW')"
          :y-axis="{
            name: '功率(KW)',
            max: v => takeInt(v.max + 1, true),
            min: v => takeInt(v.min - 1),
          }"
          x-name="时间"
          height="300px"
          colors="#6699ff"
          bg-color="#FFF"
        ></line-chart>
      </v-flex>
      <v-flex md6>
        <line-chart
          title="功率因素走势"
          :dataset-source="airconPowerFactorTrendData"
          :custom-tooltip="chartTooltipOpt()"
          :y-axis="{
            name: '功率因素',
            max: v => (v.max + 0.05).toFixed(2),
            min: v => (v.min - 0.05).toFixed(2)
          }"
          x-name="时间"
          height="300px"
          colors="#6699ff"
          bg-color="#FFF"
        ></line-chart>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import colors from 'vuetify/es5/util/colors';
import { takeInt, _isArray, deepCopyObject } from '../../../util/utils';
import { airConApi } from '../api';
import { energyManageMixin } from '../mixin.js';
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
import EnergyGuage from '../components/common/EnergyGuage.vue';
import LineChart from '../../../components/chart/SimpleChart.vue';
import { ChartTooltip, defaultTooltipOption } from '../components/common/ChartTooltip';
import AirConStatus from '../components/AirCon/AirConStatus.vue';
import SearchBar from '../components/AirCon/SearchBar.vue';

const echarts = window.echarts || null;

export default {
  components: {
    VWidget,
    SourceTypeBar,
    EnergyGuage,
    LineChart,
    AirConStatus,
    SearchBar
  },
  mixins: [energyManageMixin],
  data: vm => ({
    colors,
    machineType: vm.$route.query.m || 0,
    searchConditions: {},
    acHostTotalEnergy: 0,
    acHostEnergyUsageByDay: {},
    airconVoltageTrendData: {},
    airconIntensityTrendData: {},
    airconPowerTrendData: {},
    airconPowerFactorTrendData: {},
    currentAirCon: '',
    airconList: [],
    airconData: {}
  }),
  watch: {
    currentAirCon: {
      handler (val, old) {
        console.log(val);
        if (val && val !== old) {
          if (this.airconData[val]) {
            this.changeAirconData(this.airconData[val]);
          } else {
            console.log('#####################');
            this.getChart3(val).then(data => {
              this.changeAirconData(data);
            });
          }
        }
      },
      immediate: false
    }
  },
  mounted () {
    // console.log(this.$route);
  },
  methods: {
    init () {
      // 上面右边折线图
      this.getChart2();
      
      // 获取空调列表
      this.getAirconList();
    },
    dataReset () {
      this.acHostTotalEnergy = 0;
      this.acHostEnergyUsageByDay = {};
      this.airconVoltageTrendData = {};
      this.airconIntensityTrendData = {};
      this.airconPowerTrendData = {};
      this.airconPowerFactorTrendData = {};
      this.currentAirCon = '';
      this.airconList = [];
      this.airconData = {};
    },
    changeAirconData (data) {
      // console.log(data);
      if (!data) return;
      this.airconVoltageTrendData = data.U_Data;
      this.airconIntensityTrendData = data.I_Data;
      this.airconPowerTrendData = data.P_Data;
      this.airconPowerFactorTrendData = data.F_Data;
    },
    airconSelect (evt) {
      this.currentAirCon = evt.electricityMeterID;
    },
    takeInt,
    chartTooltipOpt (cvs, cvsCon) {
      const defTtOpt = deepCopyObject(defaultTooltipOption);
      if (cvs === 'default') {
        return ChartTooltip(defTtOpt);
      }
      defTtOpt.formatter.dataValue.conversion = cvs;
      defTtOpt.formatter.dataValue.conversionCondition = cvsCon;
      return ChartTooltip(defTtOpt);
    },
    getChart2 () {
      airConApi.homeFistChart(this.simpleParseParams({
        startTime: this.searchConditions.startTime,
        endTime: this.searchConditions.endTime,
        building: this.searchConditions.building,
        type: this.machineType
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data;
          this.acHostTotalEnergy = Number(data['总耗电']);
          const chartData = Object.entries(data.each).sort().map(([k, v]) => ({ '日期': k, '耗电': v }));
          this.acHostEnergyUsageByDay = chartData;
        }
      });
    },
    getAirconList () {
      airConApi.AirConList(this.simpleParseParams({
        startTime: this.searchConditions.startTime,
        endTime: this.searchConditions.endTime,
        building: this.searchConditions.building + (this.searchConditions.floor && this.searchConditions.floor.replace(/\D/g, '') || ''),
        type: this.machineType
      })).then(res => {
        // 月累积能耗: null
        // 楼栋: "E5-E5-4F-4AP1"
        // 电表名称: "E5-4F-4AP1"
        // 设备名称: "空调主机"
        // 设备编号: "1#"
        if (res && res.status === 200) {
          const data = res.data;
          // console.log(data);
          this.airconList = data.map((v, i) => {
            if (i === 0) {
              this.currentAirCon = v['电表ID'];
            }
            return {
              electricityMeterName: v['电表名称'],
              electricityMeterID: v['电表ID'],
              machineName: v['设备名称'],
              machineSerialNumber: v['设备编号'],
              building: v['楼栋'],
              monthEnergyUsage: v['月累积能耗']
            };
          });
        }
      });
    },
    getChart3 (type) {
      console.log(type);
      return airConApi.AirConVIPFTrend(this.simpleParseParams({
        startTime: this.searchConditions.startTime,
        endTime: this.searchConditions.endTime,
        building: this.searchConditions.building,
        type: this.machineType
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data;
          this.airconData = Object.entries(data).reduce((acc, cur) => {
            // console.log(cur);
            const [key, value] = cur;

            const U_Data = []; // 电压
            const I_Data = []; // 电流
            const P_Data = []; // 功率
            const F_Data = []; // 功率因素
            value.forEach(item => {
              const time = moment(item._timestamp).format('MM-DD HH:mm');
              U_Data.push({
                '时间': time,
                'A相电': item.v_ab,
                'B相电': item.v_bc,
                'C相电': item.v_ac
              });
              I_Data.push({
                '时间': time,
                'A相电': item.current_a,
                'B相电': item.current_b,
                'C相电': item.current_c
              });
              P_Data.push({
                '时间': time,
                '功率': item.power
              });
              F_Data.push({
                '时间': time,
                '功率因素': item.powerfactor
              });
            });
            acc[key] = { U_Data, I_Data, P_Data, F_Data };
            return acc;
          }, {});
          // console.log(this.airconData);
          if (type) {
            return new Promise(res => {
              res(this.airconData[type]);
            });
          }
        }
      });
    },
    searchBarChange (evt) {
      console.log(evt);
      this.searchConditions = evt;
      this.init();
      if (this.currentAirCon !== '') {
        this.getChart3(this.currentAirCon).then(data => {
          this.changeAirconData(data);
        });
      }
    },
    machineSwitch (type) {
      this.machineType = type;
      this.dataReset();
      this.init();
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
