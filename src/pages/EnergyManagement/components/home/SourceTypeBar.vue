<template>
<v-layout>
  <v-flex xs12 class="blue accent-2" style="padding-top:0;padding-bottom:0">
    <v-btn
      v-for="src in srcTypeList"
      :key="src.type"
      @click="click(src.type)"
      :input-value="src.type"
      class="blue accent-1"
      :class="{'active': currentType === src.type}"
      dark>{{ src.text }}</v-btn>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      srcTypeList: [
        { type: 1, text: '电' },
        { type: 2, text: '水' },
        { type: 3, text: '气' }
      ],
      currentType: 1
    };
  }
};
</script>

<style lang='stylus' scoped>
.active
  background #CCFF0030!important
  color #CCFF00
  border 1px solid #cf0!important
  box-sizing border-box
</style>