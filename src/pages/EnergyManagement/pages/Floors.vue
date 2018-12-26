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
      <v-btn-toggle v-model="text">
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
      <v-widget title="各楼层电能能耗">
          <div slot="widget-content">
            <div
              ref="chart2"
              style="height:150px"
            ></div>
          </div>
        </v-widget>
        <v-widget title="各电能类型能耗占比">
          <div slot="widget-content">
            <div
              ref="chart3"
              style="height:150px"
            ></div>
          </div>
        </v-widget>
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
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/common/SourceTypeBar.vue';
const echarts = window.echarts || undefined;

export default {
  components: {
    VWidget,
    SourceTypeBar
  },
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    items: ['E5', 'D10'],
    items2: ['BU', '楼层'],
    items3: ['1F', '1.5F', '2F'],
    items4: ['白班', '晚班']
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
    initCharts () {
      this.chart2DOM = this.$refs.chart2;
      this.chart2 = echarts.init(this.chart2DOM);

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
    chart2Option (data) {
      const chartOpts = {
        dataset: { source: data },
        legend: {
          show: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: 'bar',
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }, 
        xAxis: [{
          type: 'category',
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          max: 700
        }],
        series: []
      };
      let allData = [];
      Object.keys(data).forEach((key, index) => {
        if (index > 0) {
          const defaultSeries = {
            type: 'bar',
            barWidth: '40%',
            label: {
              normal: {
                position: 'inside'
              }
            },
          };
          let curSeries = defaultSeries;
          chartOpts.series.push(defaultSeries);
          chartOpts.stack = 1;
          data[key].forEach((val, index) => {
            if (allData[index]) {
              allData[index] += val;
            } else {
              allData[index] = val;
            }                
          });
        }
      });
      allData.sort();
      chartOpts.yAxis[0].max = Math.ceil(allData.pop() / 10) * 10;
      return chartOpts;
    },
    getChart2 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      floorsApi.chart1Data(data).then(res => {
        const data = res.data;
        const chartData = {};
        const chartOption = this.chart2Option(chartData);
        this.chart2.setOption(chartOption);
      //   // this.chart2.on('click', params => {
      //   //   this.$router.push('/energy_management/bu');
      //   // });
      });
    },
    chart3Option (data) { 
      const cData = {};
      cData['类型'] = Object.keys(data);
      cData['能耗'] = Object.keys(data).map(key => data[key]);
      const chartOpts = {
        dataset: { source: cData },
        title: {
          x: 'center'
        },
        legend: { show: true },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} KWH({d}%)'
        },
        series: [{
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
        }]
      };
      return chartOpts;
    },
    getChart3 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      floorsApi.chart1Data(data).then(res => {
        // console.log(res);
        const data = res.data;
        const chartOption = this.chart3Option(data.data.typeData);
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
