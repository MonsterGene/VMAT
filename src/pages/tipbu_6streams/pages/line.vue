<template>
<v-container grid-list-xl fluid>
  <v-layout row wrap>
    <v-flex xs12>
      <img src="../static/pic/line.png" alt="加载中...">
    </v-flex>
  </v-layout>
  <v-btn color="green">正常</v-btn>
  <v-btn color="orange">待机</v-btn>
  <v-btn color="red">异常</v-btn>
  <v-btn color="grey">断网</v-btn>
  <v-btn color="black" dark>关机</v-btn>
  <v-layout row wrap style="margin:0">
    <v-card
      class="station-card line-card"
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
    <v-card
      class="station-card"
      v-for="(item, index) in equipment_list"
      :key="index"
      color="green"
      dark hover
      :href="'#/tipbu-6streams/station-details/'+item"
    >
      <v-card-title class="pb-0">
        <h4>{{ item }}</h4>
      </v-card-title>
      <v-card-text>
        当日产出： 1500
      </v-card-text>
    </v-card>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      equipment_list: ['入前盖', '取保护板', '装LCD', '锁LCD', '装导航键', '锁主板 1', '锁主板 2', '锁主板 3', '装灯罩', '贴Label', '锁后盖', '锁面板']
    };
  }
};
</script>

<style lang='stylus' scoped>
.station-card
  margin 5px
  width 135px
.line-card
  border 3px solid #76FF03!important //green lighten-2
</style>