<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
    <tool-bar
      v-bind:openScreenStyle="openScreenStyle"
      v-bind:openChangeMode="openChangeMode"
    ></tool-bar>
    <notify-marquee></notify-marquee>
        <station-slot v-for="station of stationList" :key="station.id"
          v-bind:station="station"
        ></station-slot>
        <!-- <h2><p>Could not find Station List</p></h2> -->
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import ToolBar from '../components/ToolBar';
import NotifyMarquee from '../components/NotifyMarquee';
import StationSlot from '../components/StationSlot';
import store from '../store';
import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from '../mutation-types';

const mutations = {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
};

import { getIpAddress } from '../api/basic';
const currentUrl = window.location.hash.substring(1);
const hostname = getIpAddress();
const ws = 'ws://' + hostname + '/genius';
Vue.use(VueNativeSock, ws, {
  store: store,
  mutations: mutations,
  format: 'json',
  connectManually: true,
  // reconnection: true,
  // reconnectionAttempts: 2,
  // reconnectionDelay: 3000,
});

const vm = new Vue();

export default {
  components: {
    VueNativeSock,
    ToolBar,
    NotifyMarquee,
    StationSlot,
  },
  data () {
    return {
      openScreenStyle: false,
      openChangeMode: false,
      stationList: [],
    };
  },
  mounted () {
    const currentUrl = window.location.hash.substring(1).split('?')[0];
    const hostname = getIpAddress();
    let ws = 'ws://' + hostname + currentUrl;
    if (ws.endsWith('/')) {
      ws = ws.substring(0, ws.length - 1);
    }
    // console.log('mounted - ' + ws);
    vm.$connect(ws, { format: 'json' });
    this.$options.sockets.onmessage = (data) => this.onReceived(data);
  },
  destroyed () {
    vm.$disconnect();
    delete this.$options.sockets.onmessage;
  },
  methods: {
    onReceived (data) {
      const stationList = JSON.parse(data.data)['payload'];
      if (stationList) {
        this.stationList = stationList;
      // console.log(this.stationList);
      } else {
        this.stationList = [];
      }
    }
  },
};
</script>

<style lang='stylus' scoped>
</style>