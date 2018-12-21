<template>
  <v-bottom-sheet 
    v-model="openQuestion"
    :persistent="true"
    :hide-overlay="true"
    full-width
    color="primary"
  >
    <v-container grid-list-xl fluid pa-0>
      <v-layout row wrap>
        <v-flex lg12 xs12 sm12 md12>
          <v-list>
            <v-flex lg12 xs12 sm12 md12 mt-0 pb-0>
              <v-tooltip right>
                <v-icon
                  @click="closeQuestion"
                  slot="activator"
                  color="primary"
                  dark
                >clear</v-icon>
                <span>To Close Question</span>
              </v-tooltip>
              <time-counter :start="startCounter" :stop="stopCounter"></time-counter>
              <h3>[ {{ container }} ]: {{ title }}</h3>
            </v-flex>
            <v-flex lg12 xs12 sm12 md12 mt-0 pb-0>
              <v-img v-if="image"
                v-bind:src="computeLogo"
                max-height="200"
              ></v-img>
            </v-flex>
            <!-- input -->
            <v-flex lg12 xs12 sm12 md12 pt-0 pb-0 v-if="type === 'text'">
              <v-text-field 
                style="font-size:22px;"
                label="Type Your Input Here."
                autofocus
                outline
                clearable
                type="text"
                v-model="userInput"
                v-on:keyup.enter="onEnter"
              >
                <v-btn slot="append-outer" large color="primary" style="top: -16px" @click="submitUserInput">
                  <v-icon left>send</v-icon>
                  Submit
                </v-btn>
              </v-text-field>
            </v-flex>
            <!-- select -->
            <v-flex lg12 xs12 sm12 md12 pt-0 pb-0 v-if="type === 'select'">
              <v-select
                :items="options"
                style="font-size:22px;"
                label="Select Your Option Here."
                outline
                clearable
                v-model="userInput"
              >
                <v-btn slot="append-outer" large color="primary" style="top: -16px" @click="submitUserInput">
                  <v-icon left>send</v-icon>
                  Submit
                </v-btn>
              </v-select>
            </v-flex>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-bottom-sheet>
</template>

<script>
import TimeCounter from '../components/TimeCounter';

export default {
  components: {
    TimeCounter,
  },
  props: ['title', 'open', 'type', 'options', 'image', 'container'],
  data () {
    return {
      userInput: '',
      stopCounter: false,
      startCounter: false,
    };
  },
  computed: {
    openQuestion () {
      return this.open;
    }
  },
  watch: {
    title () {
      this.startCounter = !this.startCounter;
    }
  },
  methods: {
    submitUserInput () {
      // this.openQuestion = false;
      // this.stopCounter = !this.stopCounter;
      this.$emit('answerQuestion', this.userInput, this.container);
      this.userInput = '';
    },
    onEnter () {
      this.submitUserInput();
    },
    closeQuestion () {
      this.userInput = '';
      this.$emit('closeQuestion');
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>