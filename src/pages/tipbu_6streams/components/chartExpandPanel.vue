<template>
<v-expansion-panel v-model="dachengByHour.model" expand>
  <v-expansion-panel-content>
    <slot name="header"></slot>
    <slot></slot>
    <e-chart 
      ref="panelChart"
      :path-option="dachengByHour.chartOption"
      height="400px"
      width="100%"
      >
      </e-chart>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>