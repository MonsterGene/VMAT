<template>
<div
  class="station-card"
>
  <div class="img">
    <img :src="imgSrc" alt="加载中...">
  </div>
</div>
</template>

<script>
export default {
  props: ['imgSrc'],
  data () {
    return {
    };
  }
};
</script>

<style lang='stylus' scoped>
.station-card
  cursor: pointer;
  float:left
  display flex
  flex-direction: column;
  text-align center
  padding 20px 0
  .img
    flex 1
    height 100%
    display flex
    flex-direction: column;
    align-items flex-end
    img 
      margin 0 auto
</style>