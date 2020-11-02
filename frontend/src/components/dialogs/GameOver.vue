<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-toolbar dark :color="dialogColor">
          <v-toolbar-title>Game over</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="text-h4 text-center font-weight-bold pa-2">
          {{ gameResult }}</v-card-text
        >
        <v-card-text class="text-h5 text-center font-weight-bold pa-2">
          {{ reason }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="dialog = false">OK</v-btn>
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
      result: {},
      dialogColor: "info",
      gameResult: "",
      reason: ""
    };
  },
  methods: {
    submit() {
      this.show = false;
    },
    pop(result) {
      this.dialog = true;
      this.reason = result.reason;
      if (result.color === "draw") {
        this.dialogColor = "info";
        this.gameResult = "Draw";
      } else if (result.color === result.playerColor) {
        this.dialogColor = "success";
        this.gameResult = "You win!";
        if (this.reason === "resignation") {
          this.reason = "your opponent resigned";
        }
      } else {
        this.dialogColor = "error";
        this.gameResult = "You lose!";
        if (this.reason === "resignation") {
          this.reason = "you resigned";
        }
      }
    }
  }
};
</script>
