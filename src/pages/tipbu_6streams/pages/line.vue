<template>
<v-container grid-list-xl fluid>
  <div class="legend-container">
    <div class="legend" v-for="leg in legends" :key="leg.state">
      <div :class="['state-ide', leg.color]"></div>
      {{ leg.state }}
    </div>
  </div>
  
  <v-layout v-for="line in linesData" :key="line.id" class="line-container" row wrap>
    <v-card
      class="line-card"
      dark hover
      :href="'#/tipbu-6streams/line-details/' + line.name"
    >
      <v-card-title class="pb-0">
        <h4>{{ line.name }}</h4>
      </v-card-title>
      <v-card-text>
        <p>目标产出：{{ line.totalTarget }}台</p>
        <p>达成率：{{ line.achievingRate }}</p>
      </v-card-text>
    </v-card>
    <div class="station-container">
      <v-hover
        v-for="(station) in line.stations"
        :key="station.id"
      >
        <div
          slot-scope="{ hover }"
          :class="['station-card', {'elevation-10': hover}]"
          @click="$router.push({path: '/tipbu-6streams/station-details/'+station.name})"
        >
          <div class="top">
            <h5>{{ station.name }}<div :class="['state-ide', legends.filter(v => v.stateCode === station.stateCode)[0].color]"></div></h5>
          </div>
          <div class="img">
            <img :src="station.img" alt="加载中...">
          </div>
          <div class="bottom">
            <h5>产出： {{ station.output }}台</h5>
          </div>
        </div>
      </v-hover>
    </div>
  </v-layout>
</v-container>
</template>

<script>
import { demoApi, lineApi } from '../api/index.js';
const API = { demoApi, lineApi };

export default {
  data () {
    return {
      legends: [],
      stationImg: demoApi.stationImgConf,
      linesData: []
    };
  },
  mounted () {
    // fetch legends data
    API.lineApi.getStateLegends().then(res => {
      const data = res.data;
      console.log(data);
      if (data.success) {
        this.legends = data.data;
      } else {
        console.log(data.message);
        this.legends = API.demoApi.stateLegends;
      }
    });

    // fetch lineData data
    API.lineApi.getLinesData().then(res => {
      const data = res.data;
      console.log(data);
      if (data.success) {
        this.linesData = data.data.map(line => {
          line.achievingRate = (line.stations[line.stations.length - 1].output / line.totalTarget).toFixed(2) + '%';
          line.stations.map(station => {
            station.img = this.stationImg[station.name] || this.stationImg.default;
            return station;
          });
          return line;
        });
      } else {
        console.log(data.message);
        this.linesData = ['A01', 'A02', 'A03'].map(val => {
          return {
            id: 0,
            name: val,
            totalTarget: 2000,
            stations: API.demoApi.stationList
          };
        });
      }
    });
  }
};
</script>

<style lang='stylus' scoped>
.legend
  padding 10px
  display inline-block

.state-ide
  width:16px;
  height:16px;
  vertical-align middle
  border-radius 8px
  margin-left 5px
  display:inline-block

.legend-container
  width 1570px
  margin 0 auto
.line-container
  margin-bottom 10px!important
  margin-left auto!important
  margin-right auto!important
  width 1670px
  background #00000030
  display flex
  position relative
  &:hover
    background #0000000f
    transition 800ms ease all
  &:before,&:after
    content ''
    height 2px
    width 0
    position absolute
    background #1AAB8A
    transition: 600ms ease all;
  &:after
    bottom 0
    left 0
  &:hover:before,&:hover:after
    width 100%
    transition:800ms ease all;
  .line-card
    border 3px solid #76FF0333!important //green lighten-2
    background #42424242
    border-radius 5px
    margin-right 15px
  .line-card:before
    content ''
    display inline-block
    height calc(50% - 80px)
  .station-container
    flex:1;
    .station-card
      cursor: pointer;
      float:left
      display flex
      flex-direction: column;
      text-align center
      .top
        height 20px
      .img
        flex 1
        height calc(100% - 40px)
        display flex
        align-items flex-end
        img 
          margin 0 auto
      .bottom
        height 20px

</style>