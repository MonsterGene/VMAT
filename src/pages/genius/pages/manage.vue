<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
    <tool-bar
      v-bind:openScreenStyle="openScreenStyle"
      v-bind:openChangeMode="openChangeMode"
    ></tool-bar>
    <notify-marquee :notify="currentNotification"></notify-marquee>
    <v-flex lg7 md7 sm12 xs12>
      <h3><v-icon>menu</v-icon>Notification:</h3>
      
      <v-layout row>
        <v-flex>
          <v-text-field
            name="notify"
            label="Input new Notification Here."
            value=""
            v-model="notification"
            color="primary"
            class="input-group--focused"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn large
            color="primary"
            @click="setNotification"
          >
            Update
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <h3><v-icon>menu</v-icon>Engine Manipulation:</h3>
      <v-layout row>
          <v-btn large
            color="primary"
            @click="engineAction('Start Engine', 'first')"
          >
            Start Engine
          </v-btn>
          <v-btn large
            color="primary"
            @click="engineAction('Stop Engine', 'first')"
          >
            Stop Engine
          </v-btn>
      </v-layout>
      <v-divider></v-divider>
      <h3><v-icon>menu</v-icon>Script Manipulation:</h3>
      <v-layout row>
          <v-btn large
            color="primary"
            @click="engineAction('Update DEBUG', 'first')"
          >
            Update DEBUG
          </v-btn>
          <v-btn large
            color="primary"
            @click="engineAction('Update PROD', 'first')"
          >
            Update PROD
          </v-btn>
      </v-layout>
      <v-divider></v-divider>
      <h3><v-icon>menu</v-icon>Lock/Unlock Container:</h3>
      <v-layout row>
        <v-flex>
          <v-text-field
            label="Input Container Name Here."
            v-model="selectContainer"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn large
            color="primary"
            @click="engineAction('Lock Container', 'first')"
          >
            Lock
          </v-btn>
          <v-btn large
            color="primary"
            @click="engineAction('Unlock Container', 'first')"
          >
            Unlock
          </v-btn>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <h3><v-icon>menu</v-icon>Genius Engine Version Upgrade:</h3>
        <v-list>
          <v-list-tile
            v-for="ver of all_version"
            :key="ver"
          >
            <v-list-tile-action>
              <v-icon v-show="version === ver" color="pink">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="ver"></v-list-tile-title>
            </v-list-tile-content>
              <v-btn v-show="version !== ver"
              color="primary"
              @click="engineAction('Upgrade Engine to - ' + ver, 'first')"
            >
              Upgrade Engine
            </v-btn>
            <v-btn v-show="version === ver"
              disabled
              color="primary"
              @click="engineAction('Upgrade Engine to - ' + ver, 'first')"
            >
              Upgrade Engine
            </v-btn>
          </v-list-tile>
        </v-list>
      <v-divider></v-divider>

      <!-- release notes -->
      <h3><v-icon>menu</v-icon>Release Notes:</h3>
      <v-flex>
          <pre>{{ releaseNotes }}</pre>
      </v-flex>

    </v-flex>

    <!-- <v-divider vertical></v-divider> -->
    <!-- <v-spacer></v-spacer> -->
    <v-flex lg5 md5 sm12 xs12>
      <h3><v-icon>menu</v-icon>Action History:</h3>
      <pre v-for="h of history" :key="h">{{ h }}<v-divider></v-divider></pre>
      <v-divider></v-divider>
      <h3><v-icon>menu</v-icon>Message: time cost - <time-counter :start="startCounter" :stop="stopCounter"></time-counter></h3>
      <pre>{{ message }}</pre>
    </v-flex>
    </v-layout>
    <!-- stop comfirmation dialogs -->
      <v-layout row justify-center>
        <v-dialog v-model="openDialogs" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">{{ titleDialogs }}</v-card-title>
            <v-card-text><h4>{{ contentDialogs }}</h4></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="openDialogs = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click="openDialogs = false; engineAction(titleDialogs, 'second')">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueNativeSock from 'vue-native-websocket';
import ToolBar from '../components/ToolBar';
import NotifyMarquee from '../components/NotifyMarquee';
import StationSlot from '../components/StationSlot';
import store from '../store';
import TimeCounter from '../components/TimeCounter';

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
Vue.use(VueCookies);

import { getIpAddress } from '../api/basic';
import { getGeniusVersion } from '../api/getGeniusVersion';
import {
  getNotifyMarquee,
  setNotifyMarquee
} from '../api/getNotifyMarquee';

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
    TimeCounter,
  },
  data () {
    return {
      stopCounter: false,
      startCounter: false,
      //
      username: '',
      openScreenStyle: false,
      openChangeMode: false,
      // msg from backend
      message: '',
      notification: '',
      currentNotification: '',
      history: '',
      releaseNotes: '',
      // Stop Dialogs
      openDialogs: false,
      titleDialogs: '',
      contentDialogs: 'Please Double Confirm ???',
      // Choose container to be lock/unlock.
      selectContainer: '',
      // Choose the Genius to update.
      version: '',
      all_version: [],
    };
  },
  mounted () {
    this.username = this.$cookies.get('username');
    const hostname = getIpAddress();
    let ws = 'ws://' + hostname + '/version';
    if (ws.endsWith('/')) {
      ws = ws.substring(0, ws.length - 1);
    }
    // console.log('mounted - ' + ws);
    vm.$connect(ws, { format: 'json' });
    this.$options.sockets.onmessage = (data) => this.onReceived(data);
    this.getNotification();  // get current notification when open the page.
    this.getCurrentVersion();  // get current Genius version, and version list for upgrade
  },
  destroyed () {
    vm.$disconnect();
    delete this.$options.sockets.onmessage;
  },
  methods: {
    onReceived (data) {
      const payload = JSON.parse(data.data);
      // console.log(payload);
      const releaseNotes = payload.release_notes;
      if (releaseNotes) {
        this.releaseNotes = releaseNotes;
      }
      const history = payload.history;
      if (history) {
        this.history = history.slice(0, 15);
      }
      const message = payload.message;
      if (message) {
        this.message += message + '\n';
      }
    },
    setNotification () {
      this.$socket.sendObj(
        { 
          'action': 'notification',
          'notification': this.notification,
          'user': this.username
        }
      );
      setTimeout(() => {
        // must add some delay, since wesocket neeeds some time to connect backend.
        this.getNotification();
      }, 1500);
      // setNotifyMarquee(this.notification)
      //   .then(response => {
      //     this.notification = '';
      //     this.getNotification();
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
    },
    getNotification () {
      getNotifyMarquee()
        .then(response => {
          // console.log('Notification: ' + response.data.notification);
          this.currentNotification = response.data.notification;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getCurrentVersion () {
      getGeniusVersion()
        .then(response => {
          // console.log(response.data);
          this.version = response.data.version;
          this.all_version = response.data.all_version;
        })
        .catch(e => {
          console.log(e);
        });
    },
    engineAction (action, seq) {
      if (seq === 'first') {
        this.titleDialogs = action;
        this.openDialogs = true;
        return false;
      }
      this.message = 'Please wait about 1 minute..';  // clean message for next action.
      this.startCounter = !this.startCounter;
      let obj = {};
      if (action === 'Start Engine') {
        // console.log(action);
        obj = { 'action': 'start_engine', 'user': this.username };
      }
      if (action === 'Stop Engine') {
        // console.log(action);
        obj = { 'action': 'stop_engine', 'user': this.username };
      }
      if (action.includes('Upgrade Engine')) {
        const version = action.split('-')[1];
        // console.log(version);
        obj = { 'action': 'upgrade_engine', 'version': version, 'user': this.username };
      }
      if (action === 'Update DEBUG') {
        // console.log(action);
        obj = { 'action': 'update_te', 'user': this.username };
      }
      if (action === 'Update PROD') {
        // console.log(action);
        obj = { 'action': 'update_prod', 'user': this.username };
      }
      if (action === 'Lock Container') {
        // console.log(action + this.selectContainer);
        obj = { 'action': 'lock', 'container': this.selectContainer, 'user': this.username };
      }
      if (action === 'Unlock Container') {
        // console.log(action + this.selectContainer);
        obj = { 'action': 'unlock', 'container': this.selectContainer, 'user': this.username };
      }
      this.$socket.sendObj(obj);
      this.selectContainer = '';
    }
  },
};
</script>

<style lang='stylus' scoped>
pre {
  white-space: pre-wrap;
}
</style>