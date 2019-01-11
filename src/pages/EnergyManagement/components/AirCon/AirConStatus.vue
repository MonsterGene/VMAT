<template>
<div @click="airconClick" class="aircon-status-wrapper" :class="{'active': currentAircon === airconInfo.electricityMeterID}">
  <div class="aircon-status-top" :class="{'active': airconInfo.status !== 'NG' }">
    <h4 v-if="currentType === 0">空调主机</h4>
    <h4 v-else>空调风柜</h4>
  </div>
  <div class="aircon-status-middle">
    <div class="img">
      <img :src="deviceImg" />
    </div>
    <div class="aircon-details">
      <div><div>电表名称</div><div>{{ airconInfo.electricityMeterName }}</div></div>
      <div><div>设备名称</div><div>{{ airconInfo.machineName }}</div></div>
      <div><div>设备编号</div><div>{{ airconInfo.machineSerialNumber }}</div></div>
      <div><div>楼栋</div><div>{{ airconInfo.building }}</div></div>
    </div>
  </div>
  <div class="aircon-status-bottom" :class="{'active': currentAircon === airconInfo.electricityMeterID}">
    <div>月累积能耗</div>
    <div>{{ airconInfo.monthEnergyUsage }} KWH</div>
  </div>
</div>
</template>

<script>

export default {
  props: ['airconInfo', 'currentAircon', 'currentType'],
  data () {
    return {
      airconImg: require('../../assets/pics/aircon.png'),
      airconCabImg: require('../../assets/pics/airconCab.png')
    };
  },
  computed: {
    deviceImg () {
      if (this.currentType === 0) {
        return this.airconImg;
      } else {
        return this.airconCabImg;
      }
    }
  },
  methods: {
    airconClick () {
      this.$emit('select', this.airconInfo);
    }
  }
};
</script>

<style lang='stylus' scoped>
.aircon-status-wrapper
  width 100%
  height 250px
  display flex
  flex-direction column
  &.active
    box-shadow 0px 0px 5px 5px #00000010
  .aircon-status-top
    flex 0 0 0 48px
    height 48px
    background #d7d7d7
    text-align center
    line-height 48px
    &.active
      background #66cc99
  .aircon-status-middle
    flex 1
    color #343434
    background #f5f5f5
    display flex
    align-items: center;
    .img
      flex 3
      text-align center
      img
        max-width 100%
        max-height 100%
    .aircon-details
      flex 4
      font-size 14px
      line-height 20px
      padding 10px
      display flex
      flex-direction column
      div
        display flex
        flex 1
        div
          flex 1
  .aircon-status-bottom
    flex 0 0 0 55px
    height 55px
    width 100%
    font-size 20px
    text-align center
    display flex
    &.active
      background #e1e9fd
    div
      flex 1
      color #171f33
      line-height 55px
</style>