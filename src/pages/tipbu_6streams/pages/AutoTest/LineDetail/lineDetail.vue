<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与达成率分析（整线 - ' + $route.params.lineName + '- 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        :open="true"
        @chart-click="yieldOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与达成率分析（整线单天 - ' + $route.params.lineName + '- 每日趋势 -'+ yieldOutputByHour.date +'）'"
        :date="yieldOutputByHour.date"
        :line-id="yieldOutputByHour.lineId"
        :station-id="$route.query.s"
      ></utilization-rate-and-output-by-hour>
    </v-flex>

    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-day
        :header-text="'产出与稼动率分析（整线 - ' + $route.params.lineName + '- 每日趋势）'"
        :line-id="$route.query.l"
        :station-id="$route.query.s"
        :open="true"
        @chart-click="utilOutputByDayClick"
      ></utilization-rate-and-output-by-day>
    </v-flex>
    <v-flex lg12 sm12 xs12>
      <utilization-rate-and-output-by-hour
        :header-text="'产出与稼动率分析（整线单天 - ' + $route.params.lineName + '- 每日趋势 -'+ utilOutputByHour.date +'）'"
        :date="utilOutputByHour.date"
        :line-id="utilOutputByHour.lineId"
        :station-id="$route.query.s"
      ></utilization-rate-and-output-by-hour>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import API from '../../../api/chart';
import EChart from '@/components/chart/echart';
import {
  campaignData,
} from '@/api/chart';
import Material from 'vuetify/es5/util/colors';
import _object from 'lodash/object';
import VWidget from '@/components/VWidget';
import UtilizationRateAndOutputByDay from '../../../components/UtilizationRateAndOutputByDay.vue';
import UtilizationRateAndOutputByHour from '../../../components/UtilizationRateAndOutputByHour.vue';

export default {
  components: {
    EChart,
    VWidget,
    UtilizationRateAndOutputByDay,
    UtilizationRateAndOutputByHour
  },
  data () {
    return {
      yieldOutputByHour: {
        date: moment().format('YYYY-MM-DD'),
        lineId: this.$route.query.l
      },
      utilOutputByHour: {
        date: moment().format('YYYY-MM-DD'),
        lineId: this.$route.query.l
      },
      selectedTab: 'tab-1',
      option: null,
      dataset: {
        campaign: campaignData,
        ...API
      },
      color: Material,
      datePicker: [
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        },
        {
          menu: false,
          date: moment().format('YYYY-MM-DD')
        }
      ]
    };
  },
  watch: {
    'dachengByHour.model.0': function (n) {
      this.chartResize('dachengExp', n);
    },
    'jiadongByHour.model.0': function (n) {
      this.chartResize('jiadongExp', n);
    }
  },
  mounted () {
  },
  methods: {
    yieldOutputByDayClick (evt) {
      console.log(evt);
      this.yieldOutputByHour.date = evt.date;
    },
    utilOutputByDayClick (evt) {
      console.log(evt);
      this.utilOutputByHour.date = evt.date;
    },
    chartResize (name, n) {
      if (n) {
        setTimeout(() => {
          this.$refs[name].resize();
        }, 300);
      }
    },
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
    }
  },
};
</script>