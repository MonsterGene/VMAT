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
      <v-divider></v-divider>

      <!-- Apollo Like Layout -->
      <v-flex lg3 md6 sm12 xs12 pa-1 v-if="!screenStyle">
        <v-card style="background: rgb(143,143,143);">
          <v-card-text>
            <div class="layout row align-center justify-space-between">
                <div class="subheading ml-2">IDLE Containers</div>
                <v-chip color="gray">{{ idle_qty }}</v-chip>
            </div>
          </v-card-text>
        </v-card>
        <v-flex pa-0 mt-1 v-for="container of containerList" :key="container.id" v-if="container.status === 'idle'">
          <container-slot
            v-bind:container="container"
            v-bind:questionContainer="questionContainer"
            @clickAction="clickAction"
            @reOpenQuestion="reOpenQuestion"
            @answerQuestion="answerQuestion"
          ></container-slot>
        </v-flex>
      </v-flex>
      <v-flex lg3 md6 sm12 xs12 pa-1 v-if="!screenStyle">
        <v-card style="background: rgb(240,184,0);" v-show="run_qty">
          <v-card-text>
            <div class="layout row align-center justify-space-between">
                <div class="subheading ml-2">RUNNING Containers</div>
                <v-chip color="gray">{{ run_qty }}</v-chip>
            </div>
          </v-card-text>
        </v-card>
        <v-flex pa-0 mt-1 v-for="container of containerList" :key="container.id" v-if="container.status === 'run'">
          <container-slot
            v-bind:container="container"
            v-bind:questionContainer="questionContainer"
            @clickAction="clickAction"
            @reOpenQuestion="reOpenQuestion"
            @answerQuestion="answerQuestion"
          ></container-slot>
        </v-flex>
      </v-flex>
      <v-flex lg3 md6 sm12 xs12 pa-1 v-if="!screenStyle">
        <v-card style="background: rgb(79,145,58);" v-show="pass_qty">
          <v-card-text>
            <div class="layout row align-center justify-space-between">
                <div class="subheading ml-2">PASSED Containers</div>
                <v-chip color="gray">{{ pass_qty }}</v-chip>
            </div>
          </v-card-text>
        </v-card>
        <v-flex pa-0 mt-1 v-for="container of containerList" :key="container.id" v-if="container.status === 'pass'">
          <container-slot
            v-bind:container="container"
            v-bind:questionContainer="questionContainer"
            @clickAction="clickAction"
            @reOpenQuestion="reOpenQuestion"
            @answerQuestion="answerQuestion"
          ></container-slot>
        </v-flex>
      </v-flex>
      <v-flex lg3 md6 sm12 xs12 pa-1 v-if="!screenStyle">
        <v-card style="background: rgb(216,31,40);" v-show="fail_qty">
          <v-card-text>
            <div class="layout row align-center justify-space-between">
                <div class="subheading ml-2">FAILED Containers</div>
                <v-chip color="gray">{{ fail_qty }}</v-chip>
            </div>
          </v-card-text>
        </v-card>
        <v-flex pa-0 mt-1 v-for="container of containerList" :key="container.id" v-if="container.status === 'fail' || container.status === 'stop'">
          <container-slot
            v-bind:container="container"
            v-bind:questionContainer="questionContainer"
            @clickAction="clickAction"
            @reOpenQuestion="reOpenQuestion"
            @answerQuestion="answerQuestion"
          ></container-slot>
        </v-flex>
      </v-flex>

      <!-- Autotest Like Layout -->
      <v-flex lg2 md4 sm6 pa-1 v-show="screenStyle" v-for="container of containerList" :key="container.id">
        <container-slot2
          v-bind:container="container"
          v-bind:questionContainer="questionContainer"
          @clickAction="clickAction"
          @reOpenQuestion="reOpenQuestion"
          @answerQuestion="answerQuestion"
        ></container-slot2>
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
import ContainerSlot from '../components/ContainerSlot';
import ContainerSlot2 from '../components/ContainerSlot2';
import NotifyMarquee from '../components/NotifyMarquee';
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
    ContainerSlot,
    ContainerSlot2,
    NotifyMarquee,
  },
  data () {
    return {
      username: '',
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
      openScreenStyle: true,
      // DEBUG / PROD Mode switcher
      mode: 'PROD',
      openChangeMode: true,
      // container data
      containerList: [],
      // container status qty
      idle_qty: 0,
      run_qty: 0,
      fail_qty: 0,
      pass_qty: 0,
    };
  },
  mounted () {
    this.username = this.$cookies.get('username');
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
      // console.log(JSON.parse(data.data));
      // Parser containers list
      const containerList = JSON.parse(data.data)['payload'];
      if (containerList) {
        this.containerList = containerList;
        this.calculateUnitQty();  // calc all status qty
        // console.log(this.containerList);
      }
      // Parser Question.
      const question = JSON.parse(data.data)['ask_question'];
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
          this.reOpenQuestion();
          return false;
        } else {  // if there is not question, cleanup all question related variables, and close Question to make sure.
          this.questionContainer = '';
          this.questionTitle = '';
          this.questionType = '';
          this.questionOptions = [];
          this.closeQuestion();
        }
      }
    },
    clickAction (action, container_name) {
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
      // console.log('action: ' + action);
      // console.log('container: ' + container_name);
      // console.log('mode: ' + this.mode);
      this.$socket.sendObj(
        { 
          'mode': this.mode,
          'name': container_name, 
          'action': action,
          'user': this.username
        }
      );
    },
    answerQuestion (userInput, container_name) {
      // console.log(userInput, container_name);
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
      // console.log(this.mode);
    },
    calculateUnitQty () {
      this.idle_qty = 0;
      this.run_qty = 0;
      this.pass_qty = 0;
      this.fail_qty = 0;
      for (const container of this.containerList) {
        if (container.status === 'idle') {
          this.idle_qty += 1;
        }
        else if (container.status === 'pass') {
          this.pass_qty += 1;
        }
        else if (container.status === 'run') {
          this.run_qty += 1;
        }
        else if (container.status === 'fail' || container.status === 'stop') {
          this.fail_qty += 1;
        }
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>