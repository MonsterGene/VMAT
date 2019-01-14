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
      <state-ide :color="leg.color"></state-ide>
      {{ leg.state }}
    </div>
  </div>
  <v-dialog
    v-model="lineInfo.loadingDialog"
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
  <vue-perfect-scrollbar class="drawer-menu--scroll">
    <v-layout v-for="line in linesData" :key="line.id" class="line-container" row wrap>
      <v-card
        class="line-card"
        dark hover
        :href="'#/npbg_lh_smart_test/mfg_3/auto_test/line_detail/' + line.name + '?l=' + line.id + '&s=' + line.stations[line.stations.length - 1].id"
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
        <template
          v-for="(station) in line.stations" 
        >
          <station
            :key="station.id"
            :station="station"
            :line-id="line.id"
            :legends="legends"
          ></station>
        </template>
      </div>
    </v-layout>
  </vue-perfect-scrollbar>
</v-container>
</template>

<script>
/* eslint-disable */
import { demoApi, lineApi } from '../../../api/index.js';
import stateIde from '../../Packing/line/state-ide.vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import station from './station.vue';
import stationConnection from '../../Packing/line/stationConnection.vue';
const API = { demoApi, lineApi };

export default {
  components: {
    stateIde,
    VuePerfectScrollbar,
    station,
    stationConnection
  },
  data () {
    return {
      lineInfo: {
        loadingDialog: true,
        timeoutId: null,
        refresh: 50,
        lastReq: Date.now(),  
      },
      legends: [],
      stationImg: demoApi.testStationImgConf,
      linesData: [
        {
        "achievingRate": "0.00%",
        "id": "1",
        "name": "测试一线",
        "totalTarget": "3000",
        "stations": [
          { "english_name": "ICT",
            "id": 1,
            "name": "ICT",
            "img": '',
            "output": 126,
            "stateCode": 0 },
          { "english_name": "BST",
            "id": 2,
            "name": "BST",
            "img": '',
            "output": 100,
            "stateCode": 1 },
          { "english_name": "RF",
            "id": 3,
            "name": "RF",
            "img": '',
            "output": 100,
            "stateCode": 2 },
          { "english_name": "Run In",
            "id": 4,
            "name": "Run In",
            "img": '',
            "output": 100,
            "stateCode": 2 },
          { "english_name": "Acoustic Test",
            "id": 5,
            "name": "Acoustic Test",
            "img": '',
            "output": 100,
            "stateCode": 4 },
          { "english_name": "FST",
            "id": 6,
            "name": "FST",
            "img": '',
            "output": 100,
            "stateCode": 2 }
        ]
        },
        {
          "achievingRate": "0.00%",
          "id": 2,
          "name": "测试二线",
          "totalTarget": "2000",
          "stations": [
            { "english_name": "ICT",
              "id": 1,
              "name": "ICT",
              "img": '',
              "output": 0,
              "stateCode": 0},
            { "english_name": "BST",
              "id": 2,
              "name": "BST",
              "img": '',
              "output": 0,
              "stateCode": 1 },
            { "english_name": "Run In",
              "id": 3,
              "name": "Run In",
              "img": '',
              "output": 0,
              "stateCode": 2},
            { "english_name": "Acoustic Test",
              "id": 4,
              "name": "Acoustic Test",
              "img": '',
              "output": 0,
              "stateCode": 3 },
            { "english_name": "FST",
              "id": 5,
              "name": "FST",
              "img": '',
              "output": 0,
              "stateCode": 4 }
          ]
          },
          {
            "achievingRate": "0.00%",
            "id": 3,
            "name": "测试三线",
            "totalTarget": "2000",
            "stations": [
              { "english_name": "ICT",
                "id": 1,
                "name": "ICT",
                "img": '',
                "output": 0,
                "stateCode": 0 },
              { "english_name": "BST",
                "id": 2,
                "name": "BST",
                "img": '',
                "output": 0,
                "stateCode": 1 },
              { "english_name": "Run In",
                "id": 3,
                "name": "Run In",
                "img": '',
                "output": 0,
                "stateCode": 2 },
              { "english_name": "Acoustic Test",
                "id": 4,
                "name": "Acoustic Test",
                "img": '',
                "output": 0,
                "stateCode": 3 },
              { "english_name": "FST",
                "id": 5,
                "name": "FST",
                "img": '',
                "output": 0,
                "stateCode": 4 }
            ]
          }
      ],
      alertOpts: {
        model: false,
        type: 'error',
        text: '提示信息。'
      },
      destroyed: false
    };
  },
  mounted () {
    // fetch legends data
    API.lineApi.getStateLegends().then(res => {
      const data = res.data;
      if (data.success) {
        this.legends = data.data;
      } else {
        this.legends = [];
      }
    });

    // fetch lineData data
    this.getLinesData();
    
  },
  // beforeDestroy () {
  //   this.destroyed = true;
  //   if (this.lineInfo.timeoutId) {
  //     clearTimeout(this.lineInfo.timeoutId);
  //   }
  // },
  methods: {
    getLinesData () {
      console.log(this.stationImg);
      this.lineInfo.lastReq = Date.now();
      this.linesData = this.linesData.map(line => {
        line.achievingRate = (line.stations[line.stations.length - 1].output * 100 / line.totalTarget).toFixed(2) + '%';
        line.stations.map(station => {
          station.img = this.stationImg[station.name];
          return station;
        });
        return line;
      });
      console.log(this.linesData);
      this.lineInfo.loadingDialog = false;
      // if (!this.destroyed) {
      //   // console.log(this);
      //   if (Date.now() - this.lineInfo.lastReq > this.lineInfo.refresh) {
      //     this.getLinesData();
      //   } else {
      //     this.lineInfo.timeoutId = setTimeout(() => {
      //       this.getLinesData();
      //     }, this.lineInfo.refresh - (Date.now() - this.lineInfo.lastReq));
      //   }
      // }  
    }

    // getLinesData () {
    //   // fetch lineData data
    //   this.lineInfo.lastReq = Date.now();
    //   API.lineApi.getLinesData().then(res => {
    //     const data = res.data;
    //     if (data.success) {
          // this.linesData = data.data.map(line => {
          //   line.achievingRate = (line.stations[line.stations.length - 1].output * 100 / line.totalTarget).toFixed(2) + '%';
          //   line.stations.map(station => {
          //     station.img = this.stationImg[station.name] || this.stationImg.default;
          //     return station;
          //   });
          //   return line;
          // });
    //     } else {
    //       // console.log(data.message);
    //       this.alertOpts.text = '获取生产数据失败！';
    //       this.alertOpts.model = true;
    //       setTimeout(() => {
    //         this.alertOpts.model = false;
    //       }, 3000);
    //     }
    //     this.lineInfo.loadingDialog = false;
    //     if (!this.destroyed) {
    //       // console.log(this);
    //       if (Date.now() - this.lineInfo.lastReq > this.lineInfo.refresh) {
    //         this.getLinesData();
    //       } else {
    //         this.lineInfo.timeoutId = setTimeout(() => {
    //           this.getLinesData();
    //         }, this.lineInfo.refresh - (Date.now() - this.lineInfo.lastReq));
    //       }
    //     }
    //   });
    // }
  }
};
</script>
<style lang='stylus' scoped>
.legend
  padding 10px
  display inline-block

.legend-container
  width 1250px
  margin 0 auto
  color #fff


.line-container
  margin-bottom 20px !important
  margin-left auto !important
  margin-right auto !important
  width 910px
  background #00000030
  display flex
  position relative
  border #282a30 2px solid
  &:hover
    background #282a30
    transition 800ms ease all
  .line-card
    // border 3px solid #76FF0333!important //green lighten-2
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
</style>