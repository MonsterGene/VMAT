<template>
<div>
  <v-layout row wrap>
    <v-flex md8>
      <simple-chart
        title="该楼栋各BU电能能耗"
        series-type="bar"
        :stack="true"
        :dataset-source="buildingBuTypeData"
        :legend-list="['动力', '照明', '空调主机', '空调风柜']"
        :custom-tooltip="DefaultChartTooltip"
        y-name="用电量(KWH)"
        :colors="['#3ac0a9', '#4e7af3', '#515151', '#f7a35c']"
        bg-color="#FFF"
        height="380px"
      ></simple-chart>
    </v-flex>
    <v-flex md4>
      <energy-type-pie title="各BU电能类型能耗占比" width="100%" height="380px"></energy-type-pie>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex md1 d-flex>
      <v-select
        :items="items5"
        label="BU："
        dense></v-select>
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
  </v-layout>
  <v-layout row wrap>
    <v-flex md12>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.rowNumber }}</td>
          <td class="text-xs-right">{{ props.item.bu }}</td>
          <td class="text-xs-right">{{ props.item.floor }}</td>
          <td class="text-xs-right">{{ props.item.positionGateway }}</td>
          <td class="text-xs-right">{{ props.item.positionMeter }}</td>
          <td class="text-xs-right">{{ props.item.status }}</td>
          <td class="text-xs-right">{{ props.item.type }}</td>
          <td class="text-xs-right">{{ props.item.deviceName }}</td>
          <td class="text-xs-right">{{ props.item.question }}</td>
          <td class="text-xs-right">{{ props.item.stationCategory }}</td>
          <td class="text-xs-right">{{ props.item.question }}</td>
          <td class="text-xs-right">{{ props.item.question }}</td>
          <td class="text-xs-right">{{ props.item.level }}</td>
          <td class="text-xs-right">{{ props.item.question }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import moment from 'moment';
import { buApi } from '../../api';
import { deepCopyObject } from '../../../../util/utils';
import { energyManageMixin } from '../../mixin.js';
import BuildingsEnergyUsage from '../../components/home/BuildingsEnergyUsage.vue';
import EnergyTypePie from '../../components/home/EnergyTypePie.vue';
import SimpleChart from '../../../../components/chart/SimpleChart.vue';
import { ChartTooltip, defaultTooltipOption } from '../../components/common/ChartTooltip';

const defTooltipOpt = deepCopyObject(defaultTooltipOption);
defTooltipOpt.formatter.countTotal = {
  show: true,
  isCount: true,
};
const DefaultChartTooltip = ChartTooltip(defTooltipOpt);

const echarts = window.echarts || undefined;

export default {
  name: 'bu',
  components: {
    BuildingsEnergyUsage,
    EnergyTypePie,
    SimpleChart
  },
  mixins: [energyManageMixin],
  data: vm => ({
    buildingBuTypeData: {},
    DefaultChartTooltip,
    items5: ['SQA', 'MFG6', 'CSD'],
    items6: ['1F', '1.5F', '2F'],
    items7: ['未上电使用', '数据测试OK', '数据不能解析', '未采集到数据'],
    items8: ['3Φ380', '3Φ220', '10kv'],
    items9: ['照明', '空调', '生产动力'],
    items10: ['1', '2', '3'],
    headers: [
      { text: '序号', value: 'rowNumber' },
      { text: 'BU', value: 'bu' },
      { text: '栋别-楼层', value: 'floor' },
      { text: '网关箱安装位置', value: 'positionGateway' },
      { text: '智能电表安装位置', value: 'positionMeter' },
      { text: '电表状态', value: 'status' },
      { text: '电力类型', value: 'type' },
      { text: '电表名称', value: 'deviceName' },
      { text: '电能类型', value: 'question' },
      { text: '工段类别', value: 'stationCategory' },
      { text: '工站类别', value: 'question' },
      { text: '设备类别', value: 'question' },
      { text: 'Level', value: 'level' },
      { text: '能耗', value: 'question' }
    ],
    desserts: []
  }),
  mounted () {
    this.getChart2();
    this.getChart3();
    this.getTableData();
  },
  methods: {
    initCharts () {
      this.chart3DOM = this.$refs.chart3;
      this.chart3 = echarts.init(this.chart3DOM);
    },
    getChart2 () {
      buApi.chart1Data(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        if (res && res.status === 200) {
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
    getTableData () {
      buApi.tableData(this.simpleParseParams({
        startTime: moment().subtract('days', 7).format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        building: 'E5'
      })).then(res => {
        console.log(res);
        if (res && res.status === 200) {
          const data = res.data;
          this.desserts = data.map(v => {
            v.question = '未知';
            return v;
          });
        }
      });
    },
    searchBarChange (evt) {
      console.log(evt);
    }
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
#select{
  padding:10px
}
</style>
