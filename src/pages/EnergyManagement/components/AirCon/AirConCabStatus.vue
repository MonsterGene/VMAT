<template>
<div class="aircon-status-wrapper" :class="{'active': currentAirconcab === airconcabInfo.machineSerialNumber}">
  <div class="aircon-status-top" :class="{'active': currentAirconcab === airconcabInfo.machineSerialNumber}">
    <h4>空调风柜</h4>
  </div>
  <div class="aircon-status-middle">
    <div class="img">
      <img :src="deviceImg" />
    </div>
    <div class="aircon-details">
      <div><div>电表名称</div><div>{{ airconcabInfo.electricityMeterName }}</div></div>
      <div><div>设备名称</div><div>{{ airconcabInfo.machineName }}</div></div>
      <div><div>设备编号</div><div>{{ airconcabInfo.machineSerialNumber }}</div></div>
      <div><div>楼栋</div><div>{{ airconcabInfo.building }}</div></div>
    </div>
  </div>
  <div class="aircon-status-bottom">
    <div>月累积能耗</div>
    <div>{{ airconcabInfo.monthEnergyUsage }} KWH</div>
  </div>
</div>
</template>

<script>
const airconImg = require('../../assets/pics/aircon.jpg');
const airconCabImg = require('../../assets/pics/airconCab.png');
export default {
  props: ['airconcabInfo', 'currentAirconcab', 'currentType'],
  data () {
    return {};
  },
  computed: {
    deviceImg () {
      if (this.currentType === 0) {
        return airconImg;
      } else {
        return airconCabImg;
      }
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
    display flex
    .img
      flex 3
      text-align center
      img
        max-width 100%
        max-height 100%
    .aircon-details
      flex 2
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
    div
      flex 1
      color #171f33
      line-height 55px
      background #e1e9fd
</style>