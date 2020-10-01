<template>
  <v-col class="col-12 col-md-9 grey darken-4 d-flex justify-center">
    <div class="merida">
      <div ref="board" class="cg-board-wrap"></div>
    </div>
    <div class="d-flex flex-column">
      <v-btn @click="changeOrientation">Change orientation</v-btn>
      <input type="text" v-model="opponentMoveFrom" class="white--text" />
      <input type="text" v-model="opponentMoveTo" class="white--text" />
      <v-btn @click="opponentMove()" color="primary" dark>Move</v-btn>
      <!--  only for testing -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" dark v-bind="attrs" v-on="on">
              New Game
            </v-btn>
            <p>{{ pieceColor }}</p>
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Choose color</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container fluid>
              <v-radio-group v-model="radios">
                <v-radio label="White" value="white"></v-radio>
                <v-radio label="Black" value="black"></v-radio>
              </v-radio-group>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" dark @click="submit">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!--  only for testing -->
    </div>
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";

export default {
  name: "Humanboard",
  extends: Chessboard,

  data() {
    return {
      // only for testing
      dialog: false,
      radios: "white",
      opponentMoveFrom: "e7",
      opponentMoveTo: "e5",
      orientation: "white",
      pieceColor: "white"
      // only for testing
    };
  },
  methods: {
    // only for testing
    submit() {
      this.$store.dispatch("clearHistory");
      this.pieceColor = this.radios;
      this.dialog = false;
      this.game.reset();
      this.board.set({
        fen: this.game.fen(),
        lastMove: null,
        orientation: this.pieceColor
      });
      if (this.pieceColor === "white") {
        this.board.set({
          movable: {
            color: "white",
            events: {
              after: (orig, dest) => {
                this.changeTurn(orig, dest);
              }
            }
          }
        });
      }
    },
    // only for testing
    opponentMove() {
      let move = {
        orig: this.opponentMoveFrom,
        dest: this.opponentMoveTo,
        color: this.game.turn()
      };
      this.updateHistory(move);
      this.game.move({ from: this.opponentMoveFrom, to: this.opponentMoveTo });
      this.board.set({
        fen: this.game.fen(),
        lastMove: [this.opponentMoveFrom, this.opponentMoveTo],
        turnColor: this.toColor(),
        movable: {
          color: this.pieceColor,
          dests: this.possibleMoves()
        }
      });
      this.gameOver();
    },

    changeTurn(orig, dest) {
      let move = { orig: orig, dest: dest, color: this.game.turn() };
      this.updateHistory(move);
      this.game.move({
        from: orig,
        to: dest,
        promotion: this.promote(orig, dest)
      });
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: null,
          dests: this.possibleMoves()
        }
      });
      this.gameOver();
    }
  }
};
</script>
