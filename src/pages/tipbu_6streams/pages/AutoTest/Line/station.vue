<template>
<v-hover>
  <div
    slot-scope="{ hover }"
    :class="['station-card', {'elevation-10': hover}]"
    @click="$router.push({path: '/tipbu-6streams/auto_test/station_detail/' + station.name, query: {l: lineId, s: station.id}})"
  >
    <div class="top">
      <h5>
        {{ station.name }}
        <state-ide :color="getStateColor"></state-ide>
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
</template>

<script>
import stateIde from '../../Packing/line/state-ide.vue';

export default {
  components: { stateIde },
  props: ['station', 'lineId', 'legends'],
  data () {
    return {
    };
  },
  computed: {
    getStateColor () {
      // const color = this.legends.filter(v => v.stateCode === this.station.stateCode)[0].color;
      const color = 'black';
      return color === 'black' ? 'green' : color;
    }
  },
};
</script>

<style lang='stylus' scoped>
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