<template>
  <v-row justify="center">
    <v-dialog persistent v-model="show" max-width="290">
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
          <v-btn color="success" dark @click="choosePiece">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      piece: "q"
    };
  },
  props: {
    value: Boolean,
    color: {
      type: String,
      default: "white"
    }
  },

  computed: {
    show: {
      get() {
        return this.value;
      }
    }
  },
  methods: {
    choosePiece() {
      this.$emit("piece", this.piece);
    }
  }
};
</script>

<style scoped>
.piece {
  font-size: 40px;
}
</style>
