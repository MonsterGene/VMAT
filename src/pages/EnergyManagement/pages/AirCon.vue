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
      <v-flex md1>
        <div class="text-xs-center">
          <v-btn round>空调主机</v-btn>
        </div>
      </v-flex>
      &emsp;&emsp;
      <v-flex md1>
        <div class="text-xs-center">
          <v-btn round @click="airfenggui">空调风柜</v-btn>
        </div>
      </v-flex>
      <v-flex md2></v-flex>
      <v-flex
        md1
        d-flex
      >
        <v-select
          :items="items"
          label="楼栋："
          dense
        ></v-select>
      </v-flex>
      <v-flex
        md1
        d-flex
      >
        <v-select
          :items="items1"
          label="BU："
          dense
        ></v-select>
      </v-flex>
      <v-flex md2>
        <v-menu
          ref="menu1"
          :close-on-content-click="false"
          v-model="menu1"
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
            v-model="dateFormatted"
            label="Start"
            persistent-hint
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2>
        <v-menu
          ref="menu2"
          :close-on-content-click="false"
          v-model="menu2"
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
            v-model="dateFormatted"
            label="End"
            persistent-hint
            @blur="date = parseDate(dateFormatted)"
          ></v-text-field>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex
        md1
        d-flex
      >
        <v-select
          :items="items2"
          label="班别："
          dense
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex md4>
        <v-widget title="空调主机总能耗">
          <div slot="widget-content">
            <energy-guage title="" :value="acHostTotalEnergy" height="200px"></energy-guage>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md8>
        <line-chart
          title="当月每日空调主机能耗"
          :dataset-source="acHostEnergyUsageByDay"
          colors="#6699ff"
          bg-color="#FFF"
          height="280px"></line-chart>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex md3 v-for="(aircon, index) in airconList" :key="index">
        <air-con-status :aircon-info="aircon" current-aircon="111"></air-con-status>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex md6>
        <line-chart
          title="电压走势"
          :dataset-source="airconVoltageTrendData"
          :max-value="v => takeInt(v.max + 1, true)"
          :min-value="v => takeInt(v.min - 1)"
          :colors="['#e3d842', '#66cc33', '#e75c12']"
          y-name="电压(V)"
          x-name="时间"
          height="300px"></line-chart>
      </v-flex>
      <v-flex md6>
        <line-chart
          title="电流走势"
          :dataset-source="airconIntensityTrendData"
          :max-value="v => takeInt(v.max + 1, true)"
          :min-value="v => takeInt(v.min - 1)"
          :colors="['#e3d842', '#66cc33', '#e75c12']"
          y-name="电流(A)"
          x-name="时间"
          height="300px"></line-chart>
      </v-flex>
      <v-flex md6>
        <line-chart
          title="功率走势"
          :dataset-source="airconPowerTrendData"
          :max-value="v => takeInt(v.max + 1, true)"
          :min-value="v => takeInt(v.min - 1)"
          y-name="功率(W)"
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
          :max-value="v => (v.max + 0.05).toFixed(2)"
          :min-value="v => (v.min - 0.05).toFixed(2)"
          y-name="功率因素"
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
import { takeInt } from '../../../util/utils';
import { airConApi } from '../api';
import { energyManageMixin } from '../../../util/mixins/globalMixins';
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
import EnergyGuage from '../components/common/EnergyGuage.vue';
import LineChart from '../../../components/chart/SimpleChart.vue';
import AirConStatus from '../components/AirCon/AirConStatus.vue';

const echarts = window.echarts || null;

export default {
  components: {
    VWidget,
    SourceTypeBar,
    EnergyGuage,
    LineChart,
    AirConStatus
  },
  mixins: [energyManageMixin],
  data: vm => ({
    colors,
    acHostTotalEnergy: 0,
    acHostEnergyUsageByDay: {},
    airconVoltageTrendData: {},
    airconIntensityTrendData: {},
    airconPowerTrendData: {},
    airconPowerFactorTrendData: {},
    airconList: [
      {
        electricityMeterName: 'E5-4PP1',
        machineName: 'foxconn',
        machineSerialNumber: '111',
        building: 'E5',
        monthEnergyUsage: 54813
      },
      {
        electricityMeterName: 'E5-4PP1',
        machineName: 'foxconn',
        machineSerialNumber: '222',
        building: 'E5',
        monthEnergyUsage: 54813
      },
      {
        electricityMeterName: 'E5-4PP1',
        machineName: 'foxconn',
        machineSerialNumber: '333',
        building: 'E5',
        monthEnergyUsage: 54813
      },
      {
        electricityMeterName: 'E5-4PP1',
        machineName: 'foxconn',
        machineSerialNumber: '444',
        building: 'E5',
        monthEnergyUsage: 54813
      }
    ],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    items: ['E5', 'D10'],
    items1: ['MFG6', 'CSD'],
    items2: ['白班', '晚班'],
    dianbiaoname: 'E5-4PP1',
    shebeiname: 'foxconn',
    shebeinumber: '123456',
    building: 'E5',
    airCon: '12345kwh'
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  mounted () {
    // 上面左边仪表盘
    this.getChart1();

    // 上面右边折线图
    // this.getChartData();
    if (echarts) {
      // console.log(this.$refs.chart);
      this.chart2 = echarts.init(this.$refs.chart2);
      this.getChartData();
    }

    // 下面左边第一个折线图
    this.getChart3();

    const params = new FormData();
    const data = {
      startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      building: 'E5'
    };
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    
    airConApi.homeFistChart(params).then(res => {
      console.log(res);
      if (!res || !res.status || res.status !== 200) return;
      const data = res.data;
      if (data.success === 'true') {
        this.energyData = data.data.epnet;
      }
    });

  },
  methods: {
    takeInt,
    formatDate (date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    getChart1 () {
      airConApi.homeFistChart(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        console.log(res);
        if (res && res.status === 200) {
          this.acHostTotalEnergy = Number(res.data['总耗电']);
        }
      });
    },
    getChart2 () {
      airConApi.homeFistChart(this.simpleParseParams({
        startTime: moment().subtract('days', 30).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
          const data = res.data;
          const chartData = Object.entries(data.each).sort().map(([k, v]) => ({ '日期': k, '耗电(KWH)': v }));
          this.acHostEnergyUsageByDay = chartData;
        }
      });
    },
    getChart3 () {
      airConApi.AirConVIPFTrend(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
          const t = res.data['E54F4AP1'];
          const U_Data = []; // 电压
          const I_Data = []; // 电流
          const P_Data = []; // 功率
          const F_Data = []; // 功率因素
          t.forEach(item => {
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
          U_Data.sort((a, b) => a['时间'] - b['时间']);
          I_Data.sort((a, b) => a['时间'] - b['时间']);
          P_Data.sort((a, b) => a['时间'] - b['时间']);
          F_Data.sort((a, b) => a['时间'] - b['时间']);
          this.airconVoltageTrendData = U_Data;
          this.airconIntensityTrendData = I_Data;
          this.airconPowerTrendData = P_Data;
          this.airconPowerFactorTrendData = F_Data;
        }
      });
    },
    airfenggui: function () {
      this.$router.push('/energy_management/airConCab');
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
