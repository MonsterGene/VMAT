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
        <p>目标：2000</p>
        <p>达成：90%</p>
      </v-card-text>
    </v-card>
    <div style="flex:1;">
      <v-hover
        v-for="(item, index) in equipment_list"
        :key="item"
      >
        <div
          slot-scope="{ hover }"
          :class="['station-card', {'elevation-10': hover}, 'grey', 'lighten-3']"
          @click="$router.push({path: '/tipbu-6streams/station-details/'+item})"
        >
          <div class="top">
            <h5>{{ item }}<div :class="['state-ide', 'green']"></div></h5>
          </div>
          <img src="../static/pic/station.png" alt="加载中...">
          <div class="bottom">
            <p style="margin:0">产出： 1500</p>
          </div>
        </div>
      </v-hover>
    </div>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      legends: [
        { state: '正常', color: 'green' },
        { state: '待机', color: 'orange' },
        { state: '异常', color: 'red' },
        { state: '断网', color: 'grey' },
        { state: '关机', color: 'black' }
      ],
      equipment_list: ['入前盖', '取保护板', '装LCD', '锁LCD', '装导航键', '锁主板 1', '锁主板 2', '锁主板 3', '装灯罩', '贴Label', '锁后盖', '锁面板']
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

.station-card
  width 90px
  height 185px
  position:relative;
  padding-top:25px;
  padding-bottom:25px;
  cursor: pointer;
  float:left
  // background-image url('../static/pic/station.png')
  .top
    position:absolute;
    top:0px;
  .bottom
    position:absolute;
    bottom:0px;

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