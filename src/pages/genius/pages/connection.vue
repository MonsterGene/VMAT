<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
      <tool-bar
        v-bind:openScreenStyle="openScreenStyle"
        v-bind:openChangeMode="openChangeMode"
        @changeScreenStyle="changeScreenStyle" 
        @changeMode="changeMode"
      ></tool-bar>
      <notify-marquee></notify-marquee>

      <v-flex lg12 sm12 pa-1 ma-0>
        <v-card>
          <v-card-title style="height: 38px;">
            <v-tooltip right style="margin-left: -25px;">
              <v-btn style="padding: 1; min-width: 0;"
                :href="backPath"
                slot="activator"
                color="primary"
                dark
              ><v-icon>arrow_back</v-icon></v-btn>
              <span>Back</span>
            </v-tooltip>
            <v-tooltip right style="margin-left: -10px;">
                <v-btn
                  @click="clickAction(action, container.name)"
                  slot="activator"
                  :color="containerColor"
                  dark
                >{{ container.name }} <v-icon>{{ actionIcon }}</v-icon></v-btn>
                <span>{{ action }}</span>
              </v-tooltip>
            <v-divider vertical></v-divider>
            <v-btn v-for="controller of controllerList" :key="controller"
              flat
              color="error"
              style="margin-left: -8px; padding: 1; min-width: 0;"
              @click="openLogWindow(controller)"
            >{{ controller }}</v-btn>
            </v-card-title>
        </v-card>
      </v-flex>

      <v-flex :class="'lg' + 12 / controllerQty + ' md6 sm12 xs12'" pa-1 v-for="controller of controllerPool" :key="controller">
        <connection-slot
          v-bind:testLog="testLog"
          v-bind:cleanTestLog="cleanTestLog"
          v-bind:controller="controller"
          v-bind:container="container.name"
          @requestInitLog="requestInitLog"
          @submitUserCommand="submitUserCommand"
        ></connection-slot>
      </v-flex>

      <!-- ask question -->
      <ask-question
        v-bind:title="questionTitle"
        v-bind:type="questionType"
        v-bind:options="questionOptions"
        v-bind:image="questionImage"
        v-bind:open="openQuestion"
        v-bind:container="questionContainer"
        @closeQuestion="closeQuestion"
        @answerQuestion="answerQuestion"
      ></ask-question>
      <!-- snack bar -->
      <notify-snackbar
        :title="snackTitle"
        :open="openSnack"
      ></notify-snackbar>
      <!-- stop comfirmation dialogs -->
      <v-layout row justify-center>
        <v-dialog v-model="openDialogs" persistent max-width="500">
          <v-card>
            <v-card-title class="headline">{{ titleDialogs }}</v-card-title>
            <v-card-text><h4>{{ contentDialogs }}</h4></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="openDialogs = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat @click="openDialogs = false; clickAction('2Stop Test', titleDialogs)">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <!-- #### -->
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueNativeSock from 'vue-native-websocket';
import ToolBar from '../components/ToolBar';
import AskQuestion from '../components/AskQuestion';
import NotifyMarquee from '../components/NotifyMarquee';
import ConnectionSlot from '../components/ConnectionSlot';
import NotifySnackbar from '../components/NotifySnackbar';

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
Vue.use(VueCookies);

import { getIpAddress } from '../api/basic';
const currentUrl = window.location.hash.substring(1);
const hostname = getIpAddress();
const ws = 'ws://' + hostname + currentUrl;
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
    ToolBar,
    AskQuestion,
    NotifyMarquee,
    ConnectionSlot,
    NotifySnackbar,
  },
  data () {
    return {
      snackTitle: '',
      openSnack: false,
      // Question
      openQuestion: false,
      questionTitle: '',
      questionImage: '',
      questionContainer: '',
      questionOptions: [],
      questionType: 'select',  // or select
      // Stop Dialogs
      openDialogs: false,
      titleDialogs: '',
      contentDialogs: 'Do You Confirm to Stop Test ???',
      // Apollo like/Autotest like switcher
      screenStyle: false,
      openScreenStyle: false,
      // DEBUG / PROD Mode switcher
      mode: 'PROD',
      openChangeMode: true,
      // container data
      container: {},
      controllerList: [],
      controllerPool: ['SEQ_LOG', 'UUT'],
      controllerQty: 2,
      // for test log.
      testLog: {},
      cleanTestLog: false,
      // let use could go back to Container Page
      backPath: '',
    };
  },
  computed: {
    containerColor () {
      if (this.questionContainer === this.container.name && this.container.status === 'run') { return 'info' }
      else if (this.container.status === 'run') { return 'orange' }
      else if (this.container.status === 'idle') { return 'primary' }
      else if (this.container.status === 'fail' || this.container.status === 'stop') { return 'error' } 
      else if (this.container.status === 'pass') { return 'success' }
      else { return 'primary' }
    },
    action () {
      if (this.container.status === 'idle') { return 'Start Test' }
      else if (this.container.status === 'run') { return 'Stop Test' }
      else if (this.container.status === 'stop' || this.container.status === 'fail' || this.container.status === 'pass') { return 'Deposit Test' } 
      else { return 'Start Test' }
    }, 
    actionIcon () {
      if (this.container.status === 'idle') { return 'play_arrow' }
      else if (this.container.status === 'run') { return 'highlight_off' }
      else if (this.container.status === 'stop' || this.container.status === 'fail' || this.container.status === 'pass') { return 'delete_forever' } 
      else { return 'play_arrow' }
    },
  },
  mounted () {
    this.username = this.$cookies.get('username');
    this.backPath = window.location.hash.split('/').slice(0, 3).join('/');
    // console.log('backpath - ' + this.backPath);
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
      const content = JSON.parse(data.data);
      // console.log(content);
      // Parser containers list
      const container = content.payload;
      if (container) {
        this.container = container;
      }
      // Parser controller list
      const controllerList = content.controllerList;
      if (controllerList) {
        this.controllerList = controllerList;
      }
      // Parser Question.
      const question = content.ask_question;
      // console.log(question);
      if (question) {
        if (question.question) {
          this.questionContainer = question.container;
          this.questionTitle = question.question;
          this.questionType = 'text';
          if (question.answers) {
            this.questionOptions = question.answers;
            this.questionType = 'select';
          }
          if (this.container.name === this.questionContainer) {
            this.reOpenQuestion();
          }
        } else {  // if there is not question, cleanup all question related variables, and close Question to make sure.
          this.questionContainer = '';
          this.questionTitle = '';
          this.questionType = '';
          this.questionOptions = [];
          this.closeQuestion();
        }
      }
      // Parse real-time test log
      const controller = content.testLogController;
      if (controller) {
        // console.log(content);
        this.testLog = content;
      }
    },
    clickAction (action, container_name) {
      if (this.container.is_locked) {
        this.snackTitle = this.container.name + ' is locked by ' + this.container.lock_by_user;
        this.openSnack = !this.openSnack;
        return false;
      }
      if (action === 'Stop Test') {  // Stop Test need double confirm.
        this.titleDialogs = container_name;
        this.openDialogs = true;
        return false;
      }
      if (action === '2Stop Test') {  // it is for double confirm.
        action = action.substring(1);
        if (this.questionContainer === container_name) {
          // if stop container, will close the question prompt if question container is same as one stopped.
          this.closeQuestion();
        }
      }
      if (action === 'Deposit Test') {
        // if deposit, should clear all logs from windows, and do init for windows who is open.
        this.cleanTestLog = this.cleanTestLog;
      }
      this.$socket.sendObj(
        { 
          'mode': this.mode,
          'name': container_name, 
          'action': action,
          'user': this.username
        }
      );
    },
    submitUserCommand (userInput, controller) {
      // send user's commands to backend
      this.$socket.sendObj(
        { 
          'name': this.container.name, 
          'controller': controller,
          'cmd': userInput
        }
      );
    },
    requestInitLog (controller) {
      // controller requests the initial test log.
      // {'name': this.container_name, 'controller': this.controller_name, 'request': 'Test Log'}
      this.$socket.sendObj(
        { 
          'name': this.container.name, 
          'controller': controller,
          'request': 'Test Log'
        }
      );
    },
    answerQuestion (userInput, container_name) {
      this.$socket.sendObj(
        { 
          'name': container_name, 
          'action': 'Answer Question',
          'answer': userInput
        }
      );
      this.closeQuestion();
    },
    closeQuestion () {
      this.openQuestion = false;
    },
    reOpenQuestion () {
      this.openQuestion = true;
    },
    changeScreenStyle () {
      this.screenStyle = !this.screenStyle;
    },
    changeMode (m) {
      this.mode = m;
    },
    openLogWindow (controller) {
      const index = this.controllerPool.indexOf(controller, 0);
      if (index !== -1) {  // means found controller in controllerPool, will close controller.
        this.controllerPool.splice(index, 1);
      } else {
        if (this.controllerQty > 2) { return false }
        this.controllerPool.push(controller);
      }
      this.controllerQty = this.controllerPool.length;
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>