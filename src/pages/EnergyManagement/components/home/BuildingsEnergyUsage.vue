<template>
<div
  ref="chart"
  :style="{width: width, height: height}"
></div>
</template>

<script>
import moment from 'moment';
import { homeApi } from '../../api';
import { energyManageMixin } from '../../../../util/mixins/globalMixins';

const echarts = window.echarts || undefined;

export default {
  mixins: [energyManageMixin],
  props: ['height', 'width', 'title', 'wSize', 'chartData'],
  data () {
    return {
    };
  },
  watch: {
    wSize (s) {
      this.chart.resize();
    },
    chartData (d) {
      this.getChartData();
    }
  },
  mounted () {
    if (echarts) {
      // console.log(this.$refs.chart);
      this.chart = echarts.init(this.$refs.chart);
      this.getChartData();
    }
  },
  methods: {
    chartOptions (data) {
      const chartOpts = {
        title: {
          text: this.title,
          textStyle: {
            color: '#5e5e5e',
            fortSize: 20
          },
          top: 14,
          left: 'center'
        },
        backgroundColor: '#FFFFFF',
        dataset: { source: data },
        color: ['#3ac0a9', '#4e7af3', '#515151', '#f7a35c'],
        legend: {
          show: true,
          top: '48'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#FFF0',
          formatter: params => {
            // console.log(params);
            const building = `<div>${params[0].name}</div>`;
            let seriesInfo = ``;
            let total = Number(params[0].data['总耗电']);
            params.forEach(item => {
              let itemValue = Number(item.data[item.seriesName]);
              let itemValueText;
              // total += itemValue;
              if (itemValue >= 100000) {
                itemValueText = (itemValue / 1000000).toFixed(2) + ' M·KWH';
              } else {
                itemValueText = itemValue + ' KWH';
              }
              seriesInfo += `
                <div>
                  <span style="color:#ffcc33">${item.seriesName}</span>
                  <span style="color:#99ff00">${itemValueText}</span>
                </div>
              `;
            });
            total = total >= 100000 ? (total / 1000000).toFixed(2) + ' M·KWH' : total.toFixed(2) + ' KWH';
            seriesInfo += `
              <div>
                <span style="color:#ffcc33">总和</span>
                <span style="color:#99ff00">${total}</span>
              </div>
            `;
            // ${building}
            const containerStyle = `
              background:rgba(51, 51, 204, 0.5);
              border: 5px solid rgba(51, 51, 204, 0.1);
              padding: 5px
            `;
            return `
              <div style="${containerStyle}">
                ${seriesInfo}
              </div>`;
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: 'bar',
          }
        },
        grid: {
          top: 100,
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
          name: '用电量(KWH)'
        }],
        series: []
      };
      // let allData = [];
      Object.keys(data[0]).forEach((key, index) => {
        if (index > 0) {
          if (key === '总耗电') return;
          const defaultSeries = {
            type: 'bar',
            barWidth: '40%',
            stack: 1,
            label: {
              normal: {
                position: 'inside'
              }
            },
          };
          chartOpts.series.push(defaultSeries);
        }
      });
      console.log(chartOpts);
      return chartOpts;
    },
    getChartData () {
      if (this.chartData) {
        if (typeof this.chartData === 'boolean') return;
        const chartOpts = this.chartOptions(this.chartData);
        this.chart.setOption(chartOpts);
        return;
      }
      homeApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD')
      })).then(res => {
        if (!res || !res.status || res.status !== 200) return;
        const data = res.data;
        console.log(data);
        const chartOption = this.chartOptions(data);
        // console.log(chartOption);
        this.chart.setOption(chartOption);
        this.chart.on('click', params => {
          if (this.$route.path.indexOf('/public') !== 0) {
            this.$router.push('/energy_management/floors');
          } else {
            this.$router.push('/public/energy_management/floors');
          }
        });
      });
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>