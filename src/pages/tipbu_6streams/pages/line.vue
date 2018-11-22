<template>
<v-container grid-list-xl fluid>
  <!-- <v-layout row wrap>
    <v-flex xs12>
      <img src="../static/pic/line.png" alt="加载中...">
    </v-flex>
  </v-layout> -->
  <div class="legend" v-for="leg in legends" :key="leg.state">
    <div :class="['state-ide', leg.color]"></div>
    {{ leg.state }}
  </div>
  <v-layout row wrap style="margin:0;">
    <v-card
      class="line-card"
      color="green"
      dark hover
      href="#/tipbu-6streams/line-details/A01"
    >
      <v-card-title class="pb-0">
        <h4>A01</h4>
      </v-card-title>
      <v-card-text>
        <p>目标产出：2000台</p>
        <p>达成率：90%</p>
      </v-card-text>
    </v-card>
    <div class="station-container">
      <v-hover
        v-for="(item, index) in stationList"
        :key="item.name"
      >
        <div
          slot-scope="{ hover }"
          :class="['station-card', {'elevation-10': hover}]"
          @click="$router.push({path: '/tipbu-6streams/station-details/'+item.name})"
        >
          <div class="top">
            <h5>{{ item.name }}<div :class="['state-ide', legends.filter(v => v.state === item.state)[0].color]"></div></h5>
          </div>
          <div class="img">
            <img :src="item.img" alt="加载中...">
          </div>
          <div class="bottom">
            <p style="margin:0">产出： {{ item.output }}台</p>
          </div>
        </div>
      </v-hover>
    </div>
  </v-layout>
</v-container>
</template>

<script>
import API from '../api/chart.js';

export default {
  data () {
    return {
      legends: API.stateLegends,
      stationList: API.stationList
    };
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

.station-container
  flex:1;
  
  .station-card
    cursor: pointer;
    float:left
    height 100%
    .top
      height 20px
    .img
      flex 1
      height calc(100% - 40px)
      display flex
      align-items flex-end
      
    .bottom
      height 20px
.line-card
  border 3px solid #76FF03!important //green lighten-2
  margin-right 5px
  
.line-card:before
  content:'';
  display:inline-block;
  vertical-align:middle;
  height:15%
  
@media screen and (max-width 1350px) {
  .line-card:before{
    height:30%
  }
}
</style>