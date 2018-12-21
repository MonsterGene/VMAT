<template>
  <v-flex lg12 sm12 pa-1>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 20 : 5}`"
        class="mx-auto"
      >
        <v-card-text>
          <div class="layout row ma-0 align-center justify-space-between">
            <div class="text-box">
              <div class="subheading pb-2"><a :href="'#' + station.url"><h3>{{ station.name }}</h3></a></div>
            </div>
            <div class="text-xs-center">
              <v-chip style="background: rgb(143,143,143);" text-color="white">IDLE: {{ station.idle_number }}</v-chip>
              <v-chip style="background: rgb(240,184,0);" text-color="white">RUN: {{ station.run_number }}</v-chip>
              <v-chip color="green" text-color="white">PASS: {{ station.pass_number }}</v-chip>
              <v-chip color="red" text-color="white">FAIL: {{ station.fail_number }}</v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>

export default {
  components: {
  },
  props: ['station'],
  data () {
    return {
    };
  },
};
</script>

<style lang='stylus' scoped>
a:link {
    background-color: transparent;
    text-decoration: none;
}
a:hover {
    color: red;
    background-color: transparent;
    text-decoration: underline;
}
</style>