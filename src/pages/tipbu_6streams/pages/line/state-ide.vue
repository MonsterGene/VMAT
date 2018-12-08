<template>
<div :class="rCss" :style="rStyle"></div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
console.log(colors);
export default {
  props: ['color'],
  data () {
    return {
      rCss: ['state-ide'],
      rStyle: {}
    };
  },
  watch: {
    color: {
      handler (val) {
        let bgColor = '';
        if (val.indexOf('#') > -1) {
          bgColor = val;
        } else {
          if (val.indexOf(' ') > -1) {
            const t = val.split(' ');
            bgColor = colors[t[0]] && colors[t[0]][t[1]] || '#00000000';
          } else {
            bgColor = colors[val] && colors[val].base || '#00000000';
          }
        }
        this.$set(this.rStyle, 'background', bgColor);
      },
      immediate: true
    }
  }
};
</script>

<style lang='stylus' scoped>
.state-ide
  width:16px;
  height:16px;
  vertical-align middle
  border-radius 8px
  margin-left 5px
  display:inline-block
</style>