<template>
  <v-container
    grid-list-xl
    fluid
    v-resize="onWindowResize"
  >
    <source-type-bar></source-type-bar>
    <v-layout
      row
      wrap
      justify-end
      align-center
    >
      <v-flex md2>
        <v-menu
          ref="menu1"
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
            label="Start"
            persistent-hint
            prepend-icon="event"
          ></v-text-field>
          <v-date-picker no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md2>
        <v-menu
          ref="menu2"
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
            label="End"
            persistent-hint
          ></v-text-field>
          <v-date-picker no-title></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md1 d-flex>
        <v-select
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
      
      <div>
        <v-btn small color="primary">查询</v-btn>
      </div>
    </v-layout>
    <v-layout row wrap>
      <v-flex md8>
        <layout-map></layout-map>
      </v-flex>
      <v-flex md4>
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
                累计电能耗 <span class="grey-text">{{ totalEnergyUsage }}</span>
              </v-flex>
              <v-flex xs5>
                同比升降 <span class="grey-text">{{ YOY }} % <span class="gcem-arrow-up"></span></span>
              </v-flex>
              <v-flex xs7>
                环比升降 <span class="grey-text">{{ MOM }} % <span class="gcem-arrow-down"></span></span>
              </v-flex>
              <v-flex xs12>
                监测点 {{ warchPoint }}
              </v-flex>
              <v-flex xs12>
                采集数据 <span class="grey-text">{{ dataCount }} 个</span>
              </v-flex>
            </v-layout>
            <div
              ref="chart1"
              style="height:170px;"
            >
            </div>
          </div>
        </v-widget>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex md3>
        <v-widget title="各楼栋电能消耗">
          <div slot="widget-content">
            <div
              ref="chart2"
              style="height:250px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="NSD1各电力类型能耗占比">
          <div slot="widget-content">
            <div
              ref="chart3"
              style="height:250px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="各BU累计电能耗">
          <div slot="widget-content">
            <div
              ref="chart4"
              style="height:250px"
            ></div>
          </div>
        </v-widget>
      </v-flex>
      <v-flex md3>
        <v-widget title="NSD1电能耗趋势">
          <div slot="widget-content">
            <div
              ref="chart5"
              style="height:250px"
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
import { homeApi } from '../api';
import VWidget from '@/components/VWidget';
import SourceTypeBar from '../components/home/SourceTypeBar.vue';
import LayoutMap from '../components/home/LayoutMap.vue';
const echarts = window.echarts || undefined;
export default {
  components: {
    VWidget,
    SourceTypeBar,
    LayoutMap
  },
  data () {
    return {
      department: 'NSD1',
      totalEnergyUsage: '0 KWH',
      YOY: 45,
      MOM: 45,
      warchPoint: 'E5/E6/D9/D10/F21/B3',
      dataCount: 500,
      chartInstance: {}
    };
  },
  mounted () {
    this.initCharts();
    // 第一个chart
    this.getChart1();
    // 下面第一个chart
    this.getChart2();
    // 下面第二个图
    this.getChart3();
    // 下面第三个图
    this.getChart4();
    // 下面第4个图
    this.getChart5();
    const params = new FormData();
    const data = {
      startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      building: 'E515'
    };
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    
    homeApi.homeFistChart(params).then(res => {
      console.log(res);
      if (!res || !res.status || res.status !== 200) return;
      const data = res.data;
      if (data.success === 'true') {
        this.energyData = data.data.epnet;
      }
    });

  },
  methods: {
    onWindowResize () {
      console.log('window resize');
      Object.keys(this.chartInstance).forEach(key => {
        this.chartInstance[key].resize();
      });
    },
    initCharts () {
      // 第一个小chart
      this.chart1DOM = this.$refs.chart1;
      this.chart1 = echarts.init(this.chart1DOM);
      this.chartInstance.chart1 = this.chart1;

      // 下面第1个图
      this.chart2DOM = this.$refs.chart2;
      this.chart2 = echarts.init(this.chart2DOM);
      this.chartInstance.chart2 = this.chart2;

      // 下面第2个图
      this.chart3DOM = this.$refs.chart3;
      this.chart3 = echarts.init(this.chart3DOM);
      this.chartInstance.chart3 = this.chart3;

      // 下面第3个图
      this.chart4DOM = this.$refs.chart4;
      this.chart4 = echarts.init(this.chart4DOM);
      this.chartInstance.chart4 = this.chart4;

      // 下面第4个图
      this.chart5DOM = this.$refs.chart5;
      this.chart5 = echarts.init(this.chart5DOM);
      this.chartInstance.chart5 = this.chart5;

    },
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
      homeApi.homeFistChart(data).then(res => {
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
    chart2Option (data) {
      const chartOpts = {
        dataset: { source: data },
        color: ['rgb(58,192,169)', 'rgb(112,148,245)', 'rgb(178,189,211)', 'rgb(228,228,228)'],
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
          containLabel: true,
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
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      homeApi.chart1Data(data).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        const chartData = {};
        const buildingList = Object.keys(data);
        chartData['楼栋'] = buildingList;
        buildingList.forEach(key => {
          Object.keys(data[key].typeData).forEach(subKey => {
            if (chartData[subKey]) {
              chartData[subKey].push(data[key].typeData[subKey]);
            } else {
              chartData[subKey] = [data[key].typeData[subKey]];
            }
          });
        });

        // console.log(chartData);

        const chartOption = this.chart2Option(chartData);
        this.chart2.setOption(chartOption);
        this.chart2.on('click', params => {
          if (this.$route.path.indexOf('/public') !== 0) {
            this.$router.push('/energy_management/floors');
          } else {
            this.$router.push('/public/energy_management/floors');
          }
        });
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
        color: ['rgb(58,192,169)', 'rgb(112,148,245)', 'rgb(178,189,211)', 'rgb(228,228,228)'],
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
        // building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      homeApi.homeFistChart(data).then(res => {
        // console.log(res);
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        if (data.success === 'true') {
          const chartOption = this.chart3Option(data.data.typeData);
          this.chart3.setOption(chartOption);
        }
      });
    },
    chart4Option (data) {
      const chartOpts = {
        dataset: { source: null },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0
            }
          },
          formatter: '{b} : {c} KWH'
        },
        legend: {
          data: ['直接访问', '背景'],
          show: true
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '5%',
          top: '7%',
          height: '85%',
          containLabel: true,
          z: 22
        },
        xAxis: [{
          type: 'category',
          gridIndex: 0
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          min: 0,
          max: 100,
        },
        {
          type: 'value',
          gridIndex: 0,
          min: 0,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },  
        }
        ],
        series: [],
      };

      const chartData = {};
      chartData['BU'] = Object.keys(data);
      chartData['能耗'] = chartData['BU'].map(name => {
        return Number(data[name]);
      });
      chartOpts.dataset.source = chartData;
      const defaultSeries = {
        type: 'bar',
        barWidth: '30%',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255,108,105)'
              },
              {
                offset: 0.5,
                color: 'rgb(255,193,147)'
              },
              {
                offset: 1,
                color: 'rgb(255,249,153)'
              }
              ]
            )
          },
        },
      };
      chartOpts.series.push(defaultSeries);
      const maxVal = chartData['能耗'].reduce((acc, cur) => {
        if (cur > acc) {
          return cur;
        } else {
          return acc;
        }
      }, 0);
      chartOpts.yAxis[0].max = Math.ceil(maxVal / 10) * 10;
      return chartOpts;
    },
    getChart4 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        // building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      homeApi.chart3Data(data).then(res => {
        // console.log(res);
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        const chartOption = this.chart4Option(data);
        this.chart4.setOption(chartOption);
      });
    },
    chart5Option (data) {
      const chartOpts = {
        dataset: { source: null },
        tooltip: {
        },
        grid: {
          top: '8%',
          left: '1%',
          right: '1%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          axisLabel: {
            interval: 0
          }
        }],
        yAxis: [{
          type: 'value',
          max: 200
        }],
        series: []
      };
      const chartData = {};
      chartData['time'] = Object.keys(data);
      chartData['能耗'] = chartData['time'].map(name => {
        return Number(data[name]);
      });
      chartOpts.dataset.source = chartData;
      const defaultSeries = {
        type: 'line',
        smooth: true, 
        symbolSize: 0,
        lineStyle: {
          normal: {
            color: 'rgb(138,167,246)'
          },
        },
        areaStyle: { // 区域填充样式
          normal: {
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(125,158,246, 0.9) ' }, 
              { offset: 0.7, color: 'rgba(237,241,251, 0) ' }
            ], false),

            shadowColor: 'rgba(125,158,246, 0.9)', // 阴影颜色
            shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
      };
      chartOpts.series.push(defaultSeries);
      const maxVal = chartData['能耗'].reduce((acc, cur) => {
        if (cur > acc) {
          return cur;
        } else {
          return acc;
        }
      }, 0);
      chartOpts.yAxis[0].max = Math.ceil(maxVal / 10) * 10;
      return chartOpts;
    },
    getChart5 () {
      let params = {
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        // building: 'E515'
      };
      let data = new FormData();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      homeApi.chart5Data(data).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        // console.log(data);
        const chartOption = this.chart5Option(data);
        this.chart5.setOption(chartOption);
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
  .grey-text
    color #666
</style>
