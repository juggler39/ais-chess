<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Draw</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-5"
          >Your opponent proposes a draw. Accept?</v-card-text
        >
        <v-card-actions>
          <v-btn color="error" dark @click="dialog = false">NO</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="submit">YES</v-btn>
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
  methods: {
    submit() {
      this.$emit("drawAccepted", true);
      this.dialog = false;
    },
    pop() {
      this.dialog = true;
    }
  }
};
</script>
