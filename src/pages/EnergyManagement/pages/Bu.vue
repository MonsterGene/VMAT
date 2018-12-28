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
        md2
        d-flex
      >
        <v-select
          :items="items2"
          label="主体单元："
          dense
        ></v-select>
      </v-flex>
      <v-flex
        md1
        d-flex
      >
        <v-select
          :items="items3"
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
      <v-flex md8>
        <buildings-energy-usage title="该楼栋各BU电能能耗" :chart-data="buildingBuTypeData" width="100%" height="380px"></buildings-energy-usage>
      </v-flex>
      <v-flex md4>
        <energy-type-pie title="各BU电能类型能耗占比" width="100%" height="380px"></energy-type-pie>
      </v-flex>
      <v-flex md1 d-flex>
      <v-select
        :items="items5"
        label="BU："
        dense
      ></v-select>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items6"
        label="楼层："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 d-flex>
      <v-select
        :items="items7"
        label="电表状态："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 d-flex>
      <v-select
        :items="items8"
        label="电力类型："
        dense
      ></v-select>
    </v-flex>
    <v-flex md2 d-flex>
      <v-select
        :items="items9"
        label="电能类型："
        dense
      ></v-select>
    </v-flex>
    <v-flex md1 d-flex>
      <v-select
        :items="items10"
        label="Level："
        dense
      ></v-select>
    </v-flex>
          <input type="text" style="width:100px;height:30px;border:1px solid;border-radius:20px;outline:none" value=" " />
        <div>
        <v-btn small color="primary">查询</v-btn>
      </div>
      <v-flex md12>
       <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
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
import { buApi } from '../api';
import { energyManageMixin } from '../../../util/mixins/globalMixins';
import VWidget from '@/components/VWidget';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
import BuildingsEnergyUsage from '../components/home/BuildingsEnergyUsage.vue';
import EnergyTypePie from '../components/home/EnergyTypePie.vue';

const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    SourceTypeBar,
    MiniStatistic,
    BuildingsEnergyUsage,
    EnergyTypePie
  },
  mixins: [energyManageMixin],
  data: vm => ({
    buildingBuTypeData: true,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    items: ['E5', 'D10'],
    items2: ['BU', '楼层'],
    items3: ['CSD', 'MFG6', 'NWE'],
    items4: ['白班', '晚班'],
    items5: ['SQA', 'MFG6', 'CSD'],
    items6: ['1F', '1.5F', '2F'],
    items7: ['未上电使用', '数据测试OK', '数据不能解析', '未采集到数据'],
    items8: ['3Φ380', '3Φ220', '10kv'],
    items9: ['照明', '空调', '生产动力'],
    items10: ['1', '2', '3'],
    headers: [
      { text: '序号', value: 'calories' },
      { text: 'BU', value: 'fat' },
      { text: '栋别-楼层', value: 'carbs' },
      { text: '网关箱安装位置', value: 'protein' },
      { text: '电表状态', value: 'iron' },
      { text: '电力类型', value: 'calories' },
      { text: '电表名称', value: 'fat' },
      { text: '电能类型', value: 'carbs' },
      { text: '工段类别', value: 'protein' },
      { text: '工站类别', value: 'iron' },
      { text: '设备类别', value: 'calories' },
      { text: 'Level', value: 'fat' },
      { text: '能耗', value: 'carbs' }
    ],
    desserts: [
      {
        value: false,
        name: 'Frozen Yogurt',
        calories: '159',
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      },
      {
        value: false,
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%'
      },
      {
        value: false,
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%'
      },
      {
        value: false,
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%'
      },
      {
        value: false,
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%'
      },
      {
        value: false,
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%'
      },
      {
        value: false,
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%'
      },
      {
        value: false,
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%'
      },
      {
        value: false,
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%'
      },
      {
        value: false,
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%'
      }
    ]
  }),
  // data: () => ({
  // }),
  
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
    initCharts () {
      // this.chart2DOM = this.$refs.chart2;
      // this.chart2 = echarts.init(this.chart2DOM);

      this.chart3DOM = this.$refs.chart3;
      this.chart3 = echarts.init(this.chart3DOM);
    },
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
      buApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
          res.data.forEach(item => {
            item['总耗电'] = Object.keys(item).reduce((acc, cur, index) => {
              if (index > 0) {
                return acc + Number(item[cur]);
              } else {
                return acc;
              }
            }, 0);
          });
          this.buildingBuTypeData = res.data;
        }
      });
    },
    chart3Option (data) { 
      const cData = {};
      const chartOpts = {
        dataset: { source: cData },
        title: {
          x: 'center'
        },
        color: ['rgb(58,192,169)', 'rgb(112,148,245)', 'rgb(178,189,211)', 'rgb(228,228,228)'],
        legend: { show: true },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} KWH({d}%)'
        },
        series: []
      };
      
      cData['类型'] = Object.keys(data);
      cData['能耗'] = cData['类型'].map(name => {
        return Number(data[name]);
      });
      Object.keys(data[0]).forEach((v, i) => {
        if (i === 0) return;
        const defaultSeries = {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        };
        chartOpts.series.push(defaultSeries);
      });
      return chartOpts;
    },
    getChart3 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      buApi.chart1Data(data).then(res => {
        console.log(res);
        const data = res.data;
        const chartOption = this.chart3Option(data);
        this.chart3.setOption(chartOption);
      });
    },
  },
  
};
</script>

<style lang='stylus' scoped>
#header {
  width: 100%;
  height: 40px;

  input {
    width: 100px;
    height: 30px;
    margin: 15px;
    margin-top: 5px;
    color: #FFFFFF;
    margin-left: 50px;
  }
}

.chart1-text {
  text-align: center;
}
</style>
