<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
      <div id="editor" ref="editor"></div>
      <div 
        id="iframe-wrapper"
        :style="iframe.wrapperStyle" 
      >
        <iframe 
          v-if="loaded"
          :src="iframe.src"
          :style="iframe.style"
          :height="iframe.style.height"
          :width="iframe.style.width"
          type="application/pdf"
          frameborder="0"
        ></iframe>
      </div>
    </v-layout>
  </v-container>
</template>


<script>
import VueFrame from 'vue-frame';

export default {
  components: {
    VueFrame,
  },
  data () {
    return {
      loaded: false,
      iframe: {
        // src: 'https://channels.readthedocs.io',
        src: 'http://10.132.45.188',  // only office
        style: null,
        wrapperStyle: null,
      }
    };
  },
  mounted () {
    let editor = this.$refs.editor;
    this.iframe.style = {
      position: 'absolute',
      width: window.innerWidth,
      height: window.innerHeight,
      top: -editor.offsetTop + 'px',
      left: -editor.offsetLeft + 'px',
    };
    this.iframe.wrapperStyle = {
      overflow: 'hidden',
      height: editor.clientHeight + 'px',
      width: editor.clientWidth + 'px',
    }; 
    this.loaded = true;
  },
  methods: {
  }
};
</script>