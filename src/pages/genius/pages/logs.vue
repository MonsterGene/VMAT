<template>
  <v-container>
    <v-layout>
      <v-flex>
        <pre>{{ content }}</pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getTestLog } from '../api/getTestLog';

const currentUrl = window.location.hash.substring(1);
const connection_name = currentUrl.split('/')[3];
console.log('connection - ' + connection_name);

export default {
  components: {
  },
  data () {
    return {
      content: '',
    };
  },
  mounted () {
    this.getLog();
  },
  methods: {
    getLog () {
      getTestLog(connection_name)
        .then(response => {
          this.content = response.data.content;
          // console.log(this.content);
        })
        .catch(e => {
          console.log(e);
        });
    },
  }
};
</script>

<style lang='stylus' scoped>
pre {
  overflow: auto;
}
</style>