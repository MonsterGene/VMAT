<template>
  <v-card>
    <v-card-title style="height: 30px;">
      <h4><v-icon>menu</v-icon>{{ controller }}</h4>
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text v-if="controller !== 'STEP'">
      <textarea :id="controller"
        class="test-log-area"
        :rows="logRows"
        autofocus
        readonly
        v-model.lazy="logs"
      ></textarea>
    </v-card-text>

    <!-- For STEP windows only -->
    <v-card-text v-if="controller === 'STEP'">
      <v-list subheader>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          avatar
          @click="JustClick"
          style="background: rgb(79,145,58);"
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < items.length"
          :key="index"
        ></v-divider>
      </v-list>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions style="height: 40px;">
      <v-btn
        style="padding: 1; min-width: 0;"
        color="error" 
        :href="'#/genius/logs/' + connection_name" 
        target="_blank"
        v-if="controller !== 'STEP' && controller !== 'INFO'"
      >LOG</v-btn>
      
      <v-btn 
        style="margin-left: -5px;"
        color="primary" 
        @click="openCommandPromp" 
        v-if="controller !== 'INFO' && controller !== 'SEQ_LOG' && controller !== 'STEP'"
      >CMD</v-btn>
      <v-text-field v-if="commandPromp"
        label="Type Commands Here."
        clearable
        v-on:keyup.enter="onEnter"
        v-model="userInput"
      ></v-text-field>
      <v-btn 
        v-if="commandPromp" 
        @click="submitUserCommand" 
      ><v-icon left>send</v-icon>send</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from '../store';

export default {
  components: {
  },
  props: ['controller', 'container', 'testLog', 'cleanTestLog'],
  data () {
    return {
      commandPromp: false,
      userInput: '',
      logs: '',
      testLogFalg: false,  // false mean it is first open window, true means it is not first time.
      items: [
        { active: true, title: 'Test Step 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { active: true, title: 'Test Step 2', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 3', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 4', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 5', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 6', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 7', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        { title: 'Test Step 8', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      logRows: 22,
    };
  },
  computed: {
    connection_name () {
      return this.container + ':' + this.controller;
    },
  },
  watch: {
    'testLog': {
      handler: function (newLog) {
        if (newLog['testLogController'] === 'STEP') {
          this.logs += 'It is Step Window';
          console.log(newLog['testLog']);
        }
        else if (newLog['testLogController'] === 'INFO') {
          this.logs += 'It is INFO Window';
          console.log(newLog['testLog']);
        }
        else if (newLog['testLogController'] === this.controller) {
          const logLength = this.logs.length;
          if (logLength > 4000) {  // Limit test log length
            // console.log(this.controller + ' log length - ' + logLength);
            this.logs = this.logs.substring(logLength - 4000, logLength);
          }
          this.logs += newLog['testLog'];
          // Make sure the scroll is update to date.
          const container = this.$el.querySelector('#' + this.controller);
          container.scrollTop = container.scrollHeight + 10;
        }
      },
      deep: true,
    },
    'cleanTestLog' () {
      this.logs = '';
    },
  },
  created () {
    if (this.testLogFalg) {
      this.requestInitLog();
    }
    else {
      setTimeout(() => {
        // must add some delay, since wesocket neeeds some time to connect backend.
        this.requestInitLog();
        this.testLogFalg = true;
      }, 2000);
    }
    // dynamically change logs Rows
    const height = document.documentElement.scrollHeight;
    if (height < 700) {
      this.logRows = 18;
    }
  },
  methods: {
    openCommandPromp () {
      this.commandPromp = !this.commandPromp;
    },
    submitUserCommand () {
      this.$emit('submitUserCommand', this.userInput, this.controller);
      this.userInput = '';
    },
    onEnter () {
      this.submitUserCommand();
    },
    requestInitLog () {
      // when controller window is open, request initial test log
      this.$emit('requestInitLog', this.controller);
    },
    JustClick () {
      console.log('Step is clicked.');
    }
  }
};
</script>

<style lang='stylus' scoped>
.test-log-area {
  color: rgb(225, 225, 225);
  background-color: black;
  resize: none;
  overflow: auto;
  width: 102%;
  margin-top: -15px;
  margin-bottom: -20px;
  margin-left: -14px;
  padding-left: 5px;
  padding-right: 5px;
  overflow-y: scroll; 
}
</style>