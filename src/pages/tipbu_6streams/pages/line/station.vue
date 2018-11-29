<template>
<div
  slot-scope="{ hover }"
  :class="['station-card', {'elevation-10': hover}]"
  @click="$router.push({path: '/tipbu-6streams/station-details/'+station.name, query: {l: line.id, s: station.id}})"
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
</template>

<script>
export default {
  data () {
    return {
    };
  }
};
</script>

<style lang='stylus' scoped>

</style>