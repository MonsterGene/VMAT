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
    <!-- <embed
      type="application/pdf"
      src="http://10.167.192.146/StaticSource/EnergyManagement/E5_1_5F.pdf"
      style="width:100%;height:100%;padding:10px"
    /> -->
     <v-flex md1 d-flex style="height:">
      <v-select
        :items="items"
        label="楼栋："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 d-flex>
      <v-select
        :items="items2"
        label="主体单元："
        dense
      ></v-select>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items3"
        label="楼层："
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
        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items4"
        label="班别："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 class="py-2">
      <v-btn-toggle>
        <v-btn flat value="left">
          日
        </v-btn>
        <v-btn flat value="center">
          月
        </v-btn>
        <v-btn flat value="right">
          季度
        </v-btn>
        <v-btn flat value="justify">
          年
        </v-btn>
      </v-btn-toggle>
    </v-flex>
    <img src="../assets/pics/u655.png" width="100%" height="100%"/>
    <v-flex md8>
      <img src="../assets/pics/u652.png" width="100%" height="450px"/>
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
import { floorsApi } from '../api';
import { energyManageMixin } from '../mixin.js';
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
import BuildingsEnergyUsage from '../components/home/BuildingsEnergyUsage.vue';
import EnergyTypePie from '../components/home/EnergyTypePie.vue';

import SimpleChart from '../../../components/chart/SimpleChart.vue';
import { DefaultChartTooltip } from '../components/common/ChartTooltip';

const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    SourceTypeBar,
    BuildingsEnergyUsage,
    EnergyTypePie,
    SimpleChart
  },
  mixins: [energyManageMixin],
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    items: ['E5', 'D10'],
    items2: ['BU', '楼层'],
    items3: ['1F', '1.5F', '2F'],
    items4: ['白班', '晚班'],
    floorsTypeEnergyData: {},
    typeEnergyData: true
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
    this.getChart2();
    this.getChart3();
  },
  methods: {
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
    getChart2 () {
      floorsApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
          // const chartData = [];
          // const keys = Object.keys(res.data[0]);
          // keys.pop();
          // res.data.forEach(item => {
          //   let t = { '楼层': item.floor };
          //   keys.forEach(key => {
          //     t[key] = item[key];
          //   });
          //   chartData.push(t);
          // });
          // console.log(chartData);
          this.floorsTypeEnergyData = res.data;
        }
      });
    },
    getChart3 () {
      floorsApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 5).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E515'
      })).then(res => {
        if (res && res.status === 200) {
          console.log(res.data);
          this.typeEnergyData = res.data;
        }
      });
    },
  },
};
</script>

<style lang='stylus' scoped>

</style>
