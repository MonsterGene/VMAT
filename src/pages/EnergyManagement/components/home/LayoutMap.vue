<template>
<div class="home-layout-map">
  <img
    @mousewheel="imgScale"
    @mousedown.left.stop.prevent="onMouseEnter"
    @mousemove.left.ctrl.exact="imgScale2"
    @mousemove.left.exact="onMouseMove"
    @mouseup.left.stop.prevent="onMouseEnd"
    @mouseout="onMouseOut"
    @load="imgLoaded"
    src="../../assets/pics/sz_map.jpg"
    class="img"
    alt=""
  />
  <div
    v-for="(item, index) in watchPointList"
    :key="index"
    class="watch-point-wrapper"
    :style="{
      background: item.color,
      left: item.left * imgScaleState + imgPos.x + 'px',
      top: item.top * imgScaleState + imgPos.y + 'px'
    }">
    <div class="static-point animation" :style="{ background: item.color }"></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      imgPos: {
        x: 0,
        y: 0
      },
      imgScaleState: 1,
      imgNatWidth: 0,
      watchPointList: [
        {
          left: 585,
          top: 495,
          color: 'red'
        },
        {
          left: 628,
          top: 485,
          color: 'green'
        },
        {
          left: 733,
          top: 465,
          color: '#505F0F'
        },
        {
          left: 775,
          top: 455,
          color: '#055005'
        },
        {
          left: 905,
          top: 55,
          color: 'purple'
        }
      ]
    };
  },
  methods: {
    moveImg (e) {
      const et = e.target;
      console.log([et]);
      console.log(this.imgScaleState);
      const reg = new RegExp(/([-]?\d+)/);
      let top = et.style.top;
      let left = et.style.left;
      top = reg.exec(top);
      left = reg.exec(left);
      top = top && Number(top[1]) || 0;
      left = left && Number(left[1]) || 0;
      top = top + e.movementY;
      left = left + e.movementX;
      et.style.top = top + 'px';
      et.style.left = left + 'px';
      this.imgPos.x = left;
      this.imgPos.y = top;
    },
    onMouseEnter (e) {
      this.mouseState = 1;
      this.mouseStartTime = e.timeStamp;
    },
    onMouseMove (e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.mouseState === 1) {
        this.mouseState = 2;
      } else if (this.mouseState === 2) {
        this.moveImg(e);
      }
    },
    onMouseMove2 () {
      console.log('have ');
    },
    onMouseEnd (e) {
      const time = e.timeStamp - this.mouseStartTime;
      this.mouseState = 0;
    },
    onMouseOut (e) {
      if (this.mouseState === 2) {
        this.mouseState = 0;
      }
    },
    imgScale (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      console.log('image scale');
      let width = evt.target.width;
      if (evt.deltaY < 0) {
        evt.target.style.width = width + 20 + 'px';
        this.imgScaleState = (width + 20) / this.imgNatWidth;
      } else {
        evt.target.style.width = width - 20 + 'px';
        this.imgScaleState = (width - 20) / this.imgNatWidth;
      }
      console.log(this.imgScaleState);
    },
    imgScale2 (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
    },
    imgLoaded (e) {
      console.log(e);
      const img = e.path && e.path[0] || e.target || null;
      if (!img) return;
      this.imgScaleState = img.width / img.naturalWidth;
      this.imgNatWidth = img.naturalWidth;
    }
  }
};
</script>

<style lang='stylus' scoped>
.home-layout-map
  width 100%
  height 419px
  overflow hidden
  position relative
  top 0
  left 0
  .img
    position absolute
    top 0
    left 0
    max-width 130%
    min-width 50%
  .watch-point-wrapper
    width 10px
    height 10px
    border-radius 5px
    background pink
    position absolute
    left 0
    top 0
    
    .static-point
      width 10px
      height 10px
      border-radius 5px
      background red
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      &.animation
        animation scale 1s linear infinite;
      @keyframes scale {
        0% {
          transform scale(1)
          opacity 1
        }
        50% {
          transform scale(1.6)
          opacity 0.5
        }
        75% {
          transform scale(1.8)
          opacity 0.3
        }
        100% {
          transform scale(2)
          opacity 0
        }
      }
</style>