<template>
<v-container grid-list-xl fluid v-resize="onWindowResize">
  <source-type-bar></source-type-bar>
    <v-layout
      row
      wrap
      justify-end
      align-center>
      <v-flex md1>
        <div class="text-xs-center">
          <v-btn round>空调主机</v-btn>
        </div>
      </v-flex>
      &emsp;&emsp;
      <v-flex md1>
        <div class="text-xs-center">
          <v-btn round>空调风柜</v-btn>
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
      <v-flex md4>
        <v-widget title="空调风柜总能耗">
          <div slot="widget-content">
            <div
              ref="chart1"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md8>
        <v-widget title="当月每日空调风柜能耗">
          <div slot="widget-content">
            <div
              ref="chart2"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="空调风柜1">
          <div slot="widget-content">
            <div
              ref="airCon1"
              style="height:100px;float:left;margin-right:30px"
            >
            <img src="../assets/pics/空调风柜.png" style="width:100px;height:80px"/></div>
          <div>
              电表名称&emsp;<span>E5-4PP1</span><br />
              设备名称&emsp;<span>foxconn</span><br />
              设备编号&emsp;<span>123456</span><br />
              楼栋&emsp;<span>E5</span>
            </div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="空调风柜2">
          <div slot="widget-content">
            <div
              ref="airCon2"
              style="height:100px;float:left;margin-right:30px"
            ><img src="../assets/pics/空调风柜.png" style="width:100px;height:80px"/></div>
          <div>
              电表名称&emsp;<span>E5-4PP1</span><br />
              设备名称&emsp;<span>foxconn</span><br />
              设备编号&emsp;<span>123456</span><br />
              楼栋&emsp;<span>E5</span>
            </div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="空调风柜3">
          <div slot="widget-content">
            <div
              ref="airCon3"
              style="height:100px;float:left;margin-right:30px"
            ><img src="../assets/pics/空调风柜.png" style="width:100px;height:80px"/></div>
          <div>
              电表名称&emsp;<span>E5-4PP1</span><br />
              设备名称&emsp;<span>foxconn</span><br />
              设备编号&emsp;<span>123456</span><br />
              楼栋&emsp;<span>E5</span>
            </div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="空调风柜4">
          <div slot="widget-content">
            <div
              ref="airCon4"
              style="height:100px;float:left;margin-right:30px"
            ><img src="../assets/pics/空调风柜.png" style="width:100px;height:80px"/></div>
          <div>
              电表名称&emsp;<span>E5-4PP1</span><br />
              设备名称&emsp;<span>foxconn</span><br />
              设备编号&emsp;<span>123456</span><br />
              楼栋&emsp;<span>E5</span>
            </div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md6>
        <v-widget title="电压走势">
          <div slot="widget-content">
            <div
              ref="chart3"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md6>
        <v-widget title="电流走势">
          <div slot="widget-content">
            <div
              ref="chart4"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md6>
        <v-widget title="功率走势">
          <div slot="widget-content">
            <div
              ref="chart5"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md6>
        <v-widget title="功率因素走势">
          <div slot="widget-content">
            <div
              ref="chart6"
              style="height:200px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import { airConCabApi } from '../api';
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
    items1: ['MFG6', 'CSD'],
    items2: ['白班', '晚班']
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
    this.initCharts();
    // 上面左边仪表盘
    this.getChart1();

    // 上面右边折线图
    this.getChart2();

    // 下面左边第一个折线图
    this.getChart3();

    const params = new FormData();
    const data = {
      startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      building: 'E515'
    };
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    
    airConCabApi.homeFistChart(params).then(res => {
      console.log(res);
      if (!res || !res.status || res.status !== 200) return;
      const data = res.data;
      if (data.success === 'true') {
        this.energyData = data.data.epnet;
      }
    });

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
    onWindowResize () {
      console.log('window resize');
      Object.keys(this.chartInstance).forEach(key => {
        this.chartInstance[key].resize();
      });
    },
    initCharts () {
      // 上面左边仪表盘
      this.chart1DOM = this.$refs.chart1;
      this.chart1 = echarts.init(this.chart1DOM);
      this.chartInstance.chart1 = this.chart1;

      // 上面右边折线图
      this.chart2DOM = this.$refs.chart2;
      this.chart2 = echarts.init(this.chart2DOM);
      this.chartInstance.chart2 = this.chart2;
      
      // 下面左边第一个折线图
      this.chart3DOM = this.$refs.chart3;
      this.chart3 = echarts.init(this.chart3DOM);
      this.chartInstance.chart3 = this.chart3;
    },

    // 上面左边仪表盘
    firstChartOption (data) {
      const minVal = 0;
      const maxVal = 1000000;
      return {
        series: [
          // {
          //   name: '刻度',
          //   type: 'gauge',
          //   radius: '80%',
          //   min: 0,
          //   max: 2000000,
          //   splitNumber: 2, // 刻度数量
          //   startAngle: 180,
          //   endAngle: 0,
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       width: 1,
          //       color: [
          //         [1, 'rgba(0,0,0,0)']
          //       ]
          //     }
          //   }, // 仪表盘轴线
          //   axisLabel: {
          //     show: true,
          //     color: '#3B53A2',
          //     distance: 15,
          //     fontSize: 11,
          //     formatter: '{value}'
          //   }, // 刻度标签。
          //   axisTick: {
          //     show: true,
          //     lineStyle: {
          //       color: {
          //         type: 'radial',
          //         colorStops: [{
          //           offset: 0,
          //           color: 'rgb(189,249,219)'
          //         },

          //         {
          //           offset: 0.2,
          //           color: 'rgb(173,242,202)'
          //         },

          //         {
          //           offset: 0.4,
          //           color: 'rgb(205,226,181)'
          //         },

          //         {
          //           offset: 0.6,
          //           color: 'rgb(254,191,149)'
          //         },

          //         {
          //           offset: 0.8,
          //           color: 'rgb(254,161,142)'
          //         },

          //         {
          //           offset: 1,
          //           color: 'rgb(255,173,168)'
          //         }
          //         ],
          //         globalCoord: false // 缺省为 false
          //       },
          //       width: 2,
          //       length: 20,
          //     },
          //     length: -5
          //   }, // 刻度样式
          //   splitLine: {
          //     show: true,
          //     length: -5,
          //   }, // 分隔线样式
          //   detail: {
          //     show: false
          //   },
          //   pointer: {
          //     show: false
          //   }
          // },
          {
            type: 'gauge',
            radius: '120%',
            center: ['50%', '60%'],
            min: minVal,
            max: maxVal,
            splitNumber: 0, // 刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: 18,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: 'rgb(189,249,219)'
                      },

                      {
                        offset: 0.2,
                        color: 'rgb(173,242,202)'
                      },

                      {
                        offset: 0.4,
                        color: 'rgb(205,226,181)'
                      },

                      {
                        offset: 0.6,
                        color: 'rgb(254,191,149)'
                      },

                      {
                        offset: 0.8,
                        color: 'rgb(254,161,142)'
                      },

                      {
                        offset: 1,
                        color: 'rgb(255,173,168)'
                      }
                    ])
                  ]
                ],
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, 30],
              color: '#000',
              formatter: function (params) {
                return params + ' KWH';
              },
              textStyle: {
                fontSize: 14
              }
            },
            data: [{
              // name: "当前用户总数",
              value: data
            }]
          }
        ]
      };
    },
    getChart1 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        // building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      airConCabApi.homeFistChart(data).then(res => {
        // console.log(res);
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        if (data.success === 'true') {
          this.totalEnergyUsage = data.data.epnet;
          setInterval(() => {
            const demo = (Math.random() * 1000000).toFixed(2) - 0;
            const chartOption = this.firstChartOption(demo);
            this.chart1.setOption(chartOption);
          }, 2000);
          // const chartOption = this.firstChartOption(data.data.epnet);
          // this.chart1.setOption(chartOption);
        }
      });
    },

    // 上面右边折线图
    chart2Option (data) {
      const chartOpts = {
        title: {
          textStyle: {
            color: '#000'
          }
        },
        xAxis: {
          axisTick: {
            show: false  
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            show: true,
            fontSize: 16
          },
          data: ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36']
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
                
          },
          splitLine: {
            show: true,
          },
        },
        series: [{
          type: 'line',
          symbol: 'rect',
          symbolSize: 6,
          lineStyle: {
            width: 2,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#1a4285' // 0% 处的颜色
              }, {
                offset: 1, color: '#16387c' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }  
          },
          data: ['122', '132', '176', '654', '462', '422']
        }]
      };
    },
    getChart2 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      airConCabApi.chart1Data(data).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        // console.log(data);
        const chartOption = this.chart2Option(data);
        this.chart2.setOption(chartOption);
      });
    },

    // 下面左边第一个折线图
    chart3Option (data) {
      const chartOpts = {
        title: {
          textStyle: {
            color: '#000'
          }
        },
        xAxis: {
          axisTick: {
            show: false  
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            show: true,
            fontSize: 16
          },
          data: ['3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36']
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
                
          },
          splitLine: {
            show: true,
          },
        },
        series: [{
          type: 'line',
          symbol: 'rect',
          symbolSize: 6,
          lineStyle: {
            width: 2,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0, color: '#1a4285' // 0% 处的颜色
              }, {
                offset: 1, color: '#16387c' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }  
          },
          data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
        }]
      };
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
      airConCabApi.chart1Data(data).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        // console.log(data);
        const chartOption = this.chart3Option(data);
        this.chart3.setOption(chartOption);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
