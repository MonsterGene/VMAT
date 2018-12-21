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
import ToolBar from '../components/ToolBar';
import NotifyMarquee from '../components/NotifyMarquee';
import MachineBrief from '../components/MachineBrief';

export default {
  components: {
    ToolBar,
    NotifyMarquee,
    MachineBrief,
  },
  data () {
    return {
      hosts: [
        {
          hostname: 'focwnbu1',
          ipAddress: '10.167.192.122',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu2',
          ipAddress: '10.167.192.139',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu3',
          ipAddress: '10.167.192.141',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu4',
          ipAddress: '10.167.192.142',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu5',
          ipAddress: '10.167.192.191',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu6',
          ipAddress: '10.167.192.192',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'fortinet1',
          ipAddress: '10.167.5.238',
          details: 'Fortinet Genius Server',
          profile: true,
        },
        {
          hostname: 'robinwu laptop',
          ipAddress: '192.168.75.128',
          details: 'It is Develop Genius Server',
          profile: false,
        },
      ]
    };
  },
  methods: {
  },
};
</script>

<style lang='stylus' scoped>
</style>