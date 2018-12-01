<template>
<v-container grid-list-xl fluid>
  <v-alert
    v-model="alertOpts.model"
    :type="alertOpts.type"
    transition="scale-transition"
  >
    {{ alertOpts.text }}
  </v-alert>
  <div class="legend-container">
    <div class="legend" v-for="leg in legends" :key="leg.state">
      <div :class="['state-ide', leg.color==='black'? 'grey' : leg.color]"></div>
      {{ leg.state }}
    </div>
  </div>
  <v-dialog
    v-model="loadingDialog"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="#ffffff0f"
      dark
    >
      <v-card-text>
        数据加载中，请稍后...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-layout v-for="line in linesData" :key="line.id" class="line-container" row wrap>
    <v-card
      class="line-card"
      dark hover
      :href="'#/tipbu-6streams/line-details/' + line.name + '?l=' + line.id"
    >
      <v-card-title class="pb-0">
        <h4 style="margin: 0 auto">{{ line.name }}</h4>
      </v-card-title>
      <v-card-text>
        <h5>目标产出：{{ line.totalTarget }}台</h5>
        <h5>达成率：{{ line.achievingRate }}</h5>
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
          @click="$router.push({path: '/tipbu-6streams/station-details/'+station.name, query: {l: line.id, s: station.id}})"
        >
          <div class="top">
            <h5>
              {{ station.name }}
              <div
                :class="[
                  'state-ide',
                  legends.filter(v => v.stateCode === station.stateCode)[0].color==='black' ? 'grey' : legends.filter(v => v.stateCode === station.stateCode)[0].color
                ]">
              </div>
            </h5>
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
import { demoApi, lineApi } from '../../api/index.js';
const API = { demoApi, lineApi };

export default {
  data () {
    return {
      loadingDialog: true,
      timeoutId: null,
      refresh: 500,
      legends: [],
      stationImg: demoApi.stationImgConf,
      linesData: [],
      alertOpts: {
        model: false,
        type: 'error',
        text: '提示信息。'
      }
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
        this.legends = [];
      }
    });

    // fetch lineData data
    this.getLinesData();
    
  },
  beforeDestroy () {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },
  methods: {
    getLinesData () {
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
          this.alertOpts.text = '获取生产数据失败！';
          this.alertOpts.model = true;
          setTimeout(() => {
            this.alertOpts.model = false;
          }, 3000);
        }
        this.loadingDialog = false;
        if (this) {
          this.timeoutId = setTimeout(() => {
            console.log(this);
            this.getLinesData();
          }, this.refresh);
        }
        
      });
    }
  },
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
  width 1750px
  margin 0 auto
  color #fff
.line-container
  margin-bottom 10px!important
  margin-left auto!important
  margin-right auto!important
  width 1750px
  background #00000030
  display flex
  position relative
  &:hover
    background #282a30
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
    text-align center
  .line-card:before
    content ''
    display inline-block
    height calc(50% - 80px)
  .station-container
    flex:1;
    padding 5px
    color #fff
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