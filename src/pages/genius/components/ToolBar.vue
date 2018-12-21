<template>
  <v-toolbar :color="toolBarColor" pa-0 ma-0 height="50px">
    <a href="#/genius"><span :class="titleColor"><h4>Genius Solution</h4></span></a>

    <v-tooltip bottom>
      <v-btn
        slot="activator"
        :color="toolBarColor"
        :class="titleColor"
        @click="goManagePage"
      >
        {{ version || 'v0.0.0_xxxxxxxx' }}
        <v-icon v-if="new_version_visible" color="error">error</v-icon>
      </v-btn>
      <span>Latest Genius Version: {{ latest_version }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn
        slot="activator"
        :color="toolBarColor"
        :class="titleColor"
        @click="goManagePage"
      >
        PROD: {{ prod_version || 'v0.0.0_xxxxxxxx' }}
        <v-icon v-if="new_prod_version_visible" color="error">error</v-icon>
      </v-btn>
      <span>Latest Prod Version:  {{ latest_prod_version }}</span>
    </v-tooltip>

    <v-spacer></v-spacer>
    <span>{{ username }}</span>
    <!-- PROD / DEBUG switcher -->
    <v-menu offset-y v-if="openChangeMode">
      <v-btn
        slot="activator"
        color="error"
      >
        {{ mode }}
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(mode, index) in modes"
          :key="index"
          @click="changeMode(mode.name)"
        >
          <v-list-tile-title>{{ mode.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- Apollo like / Autotest like switcher -->
    <v-btn icon v-if="openScreenStyle">
      <v-switch label="" @click.native="changeScreenStyle"></v-switch>
    </v-btn>
  </v-toolbar>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { getGeniusVersion } from '../api/getGeniusVersion';
import { getProdVersion } from '../api/getProdVersion';
import { getServerName } from '../api/getServerName';

Vue.use(VueCookies);

export default {
  components: {
  },
  props: ['openScreenStyle', 'openChangeMode'],
  data () {
    return {
      serverName: 'Genius',
      username: '',
      role: '',
      manageUrl: '#/genius/manage',
      mode: 'PROD',
      toolBarColor: 'primary',
      titleColor: 'white--text',
      screenStyle: true,
      modes: [
        {
          index: 1,
          name: 'PROD'
        },
        {
          index: 2,
          name: 'DEBUG'
        }
      ],
      // for engine version
      version: '',
      new_version: '',
      latest_version: '',
      all_version: [],
      new_version_visible: false,
      // for prod code version
      prod_version: '',
      new_prod_version: '',
      latest_prod_version: '',
      new_prod_version_visible: false,
    };
  },
  mounted () {
    this.username = this.$cookies.get('username');
    this.role = this.$cookies.get('role');
    if (!this.username) {
      this.$router.push('/genius/login');
      return false;
    }
    if (this.role === 'operator') {
      this.modes = [
        {
          index: 1,
          name: 'PROD'
        },
      ];
    }
    // change title here
    this.getCurrentServerName();
  },
  created () {
    this.toggleFullScreen();
    this.getCurrentVersion();
    this.getProdCodeVersion();
  },
  methods: {
    getCurrentServerName () {
      getServerName()
        .then(response => {
          this.serverName = response.data.name;
          document.title = this.serverName + ' | Genius';
          // console.log(this.serverName);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCurrentVersion () {
      getGeniusVersion()
        .then(response => {
          // console.log(response.data);
          this.all_version = response.data.all_version;
          if (this.all_version) {
            this.version = response.data.version;
            this.new_version = response.data.new_version;
            this.latest_version = this.all_version[this.all_version.length - 1];
            if (this.new_version) {
              this.new_version_visible = !this.new_version_visible;
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getProdCodeVersion () {
      getProdVersion()
        .then(response => {
          // console.log(response.data);
          const all_version = response.data.all_version;
          if (all_version) {
            this.prod_version = response.data.version;
            this.new_prod_version = response.data.new_version;
            this.latest_prod_version = response.data.all_version[response.data.all_version.length - 1];
            if (this.new_prod_version) {
              this.new_prod_version_visible = !this.new_prod_version_visible;
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeMode (m) {
      this.mode = m;
      if (m === 'PROD') {
        this.toolBarColor = 'primary';
        this.titleColor = 'white--text';
        this.$emit('changeMode', 'PROD');
      } else {
        this.toolBarColor = 'warning';
        this.titleColor = 'black--text';
        this.$emit('changeMode', 'DEBUG');
      }
    },
    changeScreenStyle () {
      this.screenStyle = !this.screenStyle;
      this.$emit('changeScreenStyle');
    },
    toggleFullScreen () {
      let doc = window.document;
      let docEl = doc.documentElement;
      let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
    },
    goManagePage () {
      // console.log(this.manageUrl.substring(1));
      if (this.role === 'operator') { return false }
      this.$router.push(this.manageUrl.substring(1));
    },
  }
};
</script>

<style lang='stylus' scoped>
a{ text-decoration: none}
</style>