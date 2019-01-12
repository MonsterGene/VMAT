<template>
<div>
  <v-layout row wrap>
    <v-flex md8>
      <simple-chart
        @click="buChartClick"
        :title="condition.building + '各BU电能能耗'"
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
      <energy-type-pie :title="curBu + '电能耗类型占比'" :chart-data="buTypeData" width="100%" height="380px"></energy-type-pie>
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
  components: {
    BuildingsEnergyUsage,
    EnergyTypePie,
    SimpleChart
  },
  mixins: [energyManageMixin],
  data: vm => ({
    buildingBuTypeData: {},
    buTypeData: {},
    curBu: '',
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
  computed: {
    condition () {
      return this.$parent.searchCondition;
    }
  },
  watch: {
    // curBu () {
      
    // }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.getChart2();
    },
    buChartClick (evt) {
      console.log(evt);
      this.getChart3(evt.value);
    },
    getChart2 () {
      buApi.chart1Data(this.simpleParseParams({
        startTime: this.condition.startTime,
        endTime: this.condition.endTime,
        building: this.condition.building
      })).then(res => {
        if (res && res.status === 200) {
          this.buildingBuTypeData = res.data;
          if (res.data[0]) {
            this.curBu = res.data[0].BU;
            this.getChart3(res.data[0]);
          }
        }
      });
    },
    getChart3 (data) {
      data = deepCopyObject(data);
      this.curBu = data.BU;
      // delete data.BU;
      this.buTypeData = data;
    },
    getTableData () {
      buApi.tableData(this.simpleParseParams({
        startTime: this.condition.startTime,
        endTime: this.condition.endTime,
        building: this.condition.building
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

</style>
