<template>
  <v-row justify="center">
    <v-dialog persistent v-model="dialog" max-width="290">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Promote to</v-toolbar-title>
        </v-toolbar>

        <v-btn-toggle v-model="piece" mandatory>
          <v-btn value="q" class="piece">
            {{ color === "white" ? "♛" : "♕" }}
          </v-btn>
          <v-btn value="r" class="piece">
            {{ color === "white" ? "♜" : "♖" }}
          </v-btn>
          <v-btn value="b" class="piece">
            {{ color === "white" ? "♝" : "♗" }}
          </v-btn>
          <v-btn value="n" class="piece">
            {{ color === "white" ? "♞" : "♘" }}
          </v-btn>
        </v-btn-toggle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="click">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      piece: "q",
      dialog: false
    };
  },
  props: {
    color: {
      type: String,
      default: "white"
    }
  },

  methods: {
    choosePiece() {
      this.$emit("piece", this.piece);
      this.dialog = false;
    },
    pop() {
      this.dialog = true;
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
      });
    },
    click() {
      this.dialog = false;
      this.resolve(this.piece);
    }
  }
};
</script>

<style scoped>
.piece {
  font-size: 40px;
}
</style>
