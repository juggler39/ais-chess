<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ result.color }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-5"> {{ result.reason }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="dialog = false">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      result: {}
    };
  },
  methods: {
    submit() {
      this.show = false;
    },
    pop(result) {
      this.dialog = true;
      this.result.color = result.color;
      this.result.reason = result.reason;
    }
  }
};
</script>
