<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <!-- mini statistic start 迷你静态图标头部-->
    <v-flex lg3 sm6 xs12>
      <mini-statistic
        icon="fa fa-facebook"
        title="100+"
        sub-title="Likes"
        color="indigo"
      >
      </mini-statistic>
    </v-flex>
    <v-flex lg3 sm6 xs12>
      <mini-statistic
        icon="fa fa-google"
        title="150+"
        sub-title="Connections"
        color="red"
      >
      </mini-statistic>
    </v-flex>
    <v-flex lg3 sm6 xs12>
      <mini-statistic
        icon="fa fa-twitter"
        title="200+"
        sub-title="Followers"
        color="light-blue"
      >
      </mini-statistic>
    </v-flex>
    <v-flex lg3 sm6 xs12>
      <mini-statistic
        icon="fa fa-instagram"
        title="50+"
        sub-title="Shots"
        color="purple"
      >
      </mini-statistic>
    </v-flex>
    <!-- mini statistic  end 迷你静态图标尾部-->
    <v-flex lg8 sm12 xs12>
      <v-widget title="Site Traffic" content-bg="white">
        <v-btn icon slot="widget-header-action">
          <v-icon class="text--secondary">refresh</v-icon>
        </v-btn>
        <div slot="widget-content">
            <e-chart 
            v-if="siteTrafficData"
            :path-option="[
              ['dataset.source', siteTrafficData],
              ['color', [color.lightBlue.base, color.green.lighten1]],
              ['legend.show', true],
              ['xAxis.axisLabel.show', true],
              ['yAxis.axisLabel.show', true],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],
              ['series[0].type', 'bar'],
              ['series[0].areaStyle', {}],
              ['series[0].smooth', true],
              ['series[1].smooth', true],
              ['series[1].type', 'bar'],
              ['series[1].areaStyle', {}],
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>     
        </div>
      </v-widget>  
    </v-flex>
    <v-flex lg4 sm12 xs12>
      <v-widget title="Top Location" content-bg="white">
        <div slot="widget-content">
            <e-chart 
            v-if="locationData"
            :path-option="[
              ['dataset.source', locationData],
              ['legend.bottom', '0'],
              ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
              ['xAxis.show', false],
              ['yAxis.show', false],
              ['series[0].type', 'pie'],
              ['series[0].avoidLabelOverlap', true],         
              ['series[0].radius', ['50%', '70%']],                      
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>
        </div>
      </v-widget>  
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import VWidget from '@/components/VWidget';
import EChart from '@/components/chart/echart';
import Material from 'vuetify/es5/util/colors';
import API from '../api';

export default {
  components: {
    MiniStatistic,
    VWidget,
    EChart
  },
  data () {
    return {
      color: Material,
      siteTrafficData: null,
      locationData: null
    };
  },
  mounted () {
    this.getSiteTrafficData();
    this.getLocationData();
  },
  methods: {
    getSiteTrafficData () {
      const result = API.getMonthVisit();
      if (result.then) {
        console.log('------------');
        result.then(response => {
          this.siteTrafficData = response;
        });
      } else {
        console.log('------------');
        console.log(result.data);
        this.siteTrafficData = result.data;
      }
    },
    getLocationData () {
      const result = API.getLocation();
      if (result.then) {
        console.log('------------');
        result.then(response => {
          this.locationData = response;
        });
      } else {
        console.log('------------');
        console.log(result.data);
        this.locationData = result.data;
      }
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>