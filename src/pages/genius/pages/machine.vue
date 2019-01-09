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

export default {
  components: {
    MachineBrief,
  },
  data () {
    return {
      hosts: [
        {
          hostname: 'focwnbu1',
          ipAddress: '10.167.219.23',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu2',
          ipAddress: '10.167.219.25',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu3',
          ipAddress: '10.167.219.27',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu4',
          ipAddress: '10.167.219.28',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu5',
          ipAddress: '10.167.219.30',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu6',
          ipAddress: '10.167.219.31',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu7',
          ipAddress: '10.167.219.33',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu8',
          ipAddress: '10.167.219.34',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu9',
          ipAddress: '10.167.219.35',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'focwnbu10',
          ipAddress: '10.167.219.36',
          details: 'WNBU Genius Server',
          profile: true,
        },
        {
          hostname: 'fortinet1',
          ipAddress: '10.167.5.238',
          details: 'Fortinet Genius Server',
          profile: true,
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