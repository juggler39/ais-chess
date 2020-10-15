<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ result }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-5"> {{ reason }}</v-card-text>
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
      dialog: false
    };
  },
  props: {
    result: String,
    reason: String
  },
  methods: {
    submit() {
      this.show = false;
    },
    pop() {
      this.dialog = true;
    }
  }
};
</script>
