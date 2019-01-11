<template>
  <v-container grid-list-xl fluid pa-3>
    <v-layout row wrap>
      <v-flex lg12 md12 sm12 xs12>
      <v-card color="primary">
        <v-card-text>
            <h3 class="headline text-md-center white--text">Genius - ODM Automatic Test Platform</h3>
        </v-card-text>
      </v-card>
      </v-flex>
    <machine-brief v-for="host of hosts" :key="host.hostname"
      v-bind:host="host"
    ></machine-brief>
    </v-layout>
  </v-container>
</template>

<script>
import MachineBrief from '../components/MachineBrief';
import { machineApi } from '../api';

export default {
  components: {
    MachineBrief,
  },
  data () {
    return {
      hosts: []
    };
  },
  methods: {
    hosts () {
      machineApi.hosts(null, true).then(res => {
        if (res && res.status === 200) {
          this.hosts = res.data;
        }
      });
    }
  },
};
</script>

<style lang='stylus' scoped>
</style>