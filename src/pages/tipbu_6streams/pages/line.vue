<template>
<v-container grid-list-xl fluid>
  <!-- <v-layout row wrap>
    <v-flex xs12>
      <img src="../static/pic/line.png" alt="加载中...">
    </v-flex>
  </v-layout> -->
  <div class="legend-container">
    <div class="legend" v-for="leg in legends" :key="leg.state">
      <div :class="['state-ide', leg.color]"></div>
      {{ leg.state }}
    </div>
  </div>
  
  <v-layout v-for="line in lineList" :key="line" class="line-container" row wrap>
    <v-card
      class="line-card"
      color="green"
      dark hover
      href="#/tipbu-6streams/line-details/A01"
    >
      <v-card-title class="pb-0">
        <h4>{{ line }}</h4>
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
            <h5>产出： {{ item.output }}台</h5>
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
      lineList: ['A01', 'A02', 'A03'],
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

.legend-container
  width 1570px
  margin 0 auto
.line-container
  margin-bottom:10px!important;
  margin-left auto!important
  margin-right auto!important
  width 1570px
  display flex
  .line-card
    border 3px solid #76FF03!important //green lighten-2
    border-radius 5px
    margin-right 15px
  .line-card:before
    content ''
    display inline-block
    height calc(50% - 80px)
  .station-container
    flex:1;
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