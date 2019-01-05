<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" small fab dark><slot name="icon"></slot></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">
            <slot name="dialog_header"></slot>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <slot name="dialog_content"></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">NO</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>