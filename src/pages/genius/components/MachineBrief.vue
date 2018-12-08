<template>
    <v-flex lg3 xs6 sm12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ host.hostname }}</h3>
            <v-divider></v-divider>
            <div>IP Address: {{ host.ipAddress }}</div>
            <div>{{ host.details }}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn :href="'#/genius/?machine=' + host.ipAddress" color="primary" @click="activeStation">Explore</v-btn>
          <v-btn 
            v-if="host.hostname !== 'fortinet1'" 
            :href="'#/vision/advanced/?machine=' + host.hostname" 
            color="success">Profile</v-btn>
          <v-btn v-if="host.hostname === 'fortinet1'" :href="'#/fortinet/advanced/?machine=' + host.hostname" color="success">Profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  props: ['host'],
  data () {
    return {
    };
  },
  methods: {
    activeStation () {
      this.$emit('activeStation');
    }
  }
};
</script>