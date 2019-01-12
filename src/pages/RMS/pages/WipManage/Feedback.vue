<template>
<iframe id="wipFeedback" src="http://10.129.4.28:800/rmswip/feedback" width="100%" :height="height"></iframe>
</template>

<script>
export default {
  computed: {
    height () {
      return (window.innerHeight - 114) + 'px';
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>