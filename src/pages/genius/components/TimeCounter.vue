<template>
  <span>{{ hours + ':' + minutes + ':' + seconds }}</span>
</template>

<script>
export default {
  props: ['start', 'stop'],
  data () {
    return {
      counter: 0,
      timeCounter: null,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  },
  watch: {
    start () {
      this.counter = 0;
      this.startCounter();
    },
    stop () {
      this.stopCounter();
    },
  },
  mounted () {
    // this.startCounter();
  },
  methods: {
    startCounter () {
      this.stopCounter();
      this.timeCounter = setInterval(this.calcTimer, 1000);
    },
    calcTimer () {
      this.seconds = this.timerFormat(++this.counter % 60);
      this.minutes = this.timerFormat(parseInt(this.counter / 60, 10) % 60);
      this.hours = this.timerFormat(parseInt(this.counter / 3600, 10));
    },
    stopCounter () {
      clearInterval(this.timeCounter);
      this.timeCounter = null;
    },
    timerFormat (timer) {
      return timer > 9 ? timer : '0' + timer;
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>