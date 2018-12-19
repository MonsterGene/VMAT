<template>
  <MarqueeTips :content="content" :speed="speed" style="font-size: 16px" font="30px sans-serif"></MarqueeTips>
</template>

<script>
import MarqueeTips from 'vue-marquee-tips';
import { getNotifyMarquee } from '../api/getNotifyMarquee';


export default {
  components: {
    MarqueeTips,
  },
  props: ['notify'],
  data () {
    return {
      content: '',
      speed: 100,
    };
  },
  watch: {
    notify () {
      this.content = this.notify;
      this.speed = 100;
    }
  },
  mounted () {
    this.getMarquee();
  },
  methods: {
    getMarquee () {
      getNotifyMarquee()
        .then(response => {
          const content = response.data.notification;
          if (content) {
            this.content = content;
            this.speed = 100;
          } else {
            this.content = '.';
            this.speed = 0;
          }
        })
        .catch(e => {
          console.log(e);
          this.content = 'Genius Engine Service Meet Errors...Make Sure Genius Engine is Launched!';
        });
    },
  }
};
</script>

<style lang='stylus' scoped>
</style>