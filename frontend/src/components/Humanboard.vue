<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar color="black" />
      <div class="merida">
        <div ref="board" class="cg-board-wrap"></div>
      </div>
      <Playerbar color="white" :username="$store.state.loginUser" />
    </v-card>

    <div class="d-flex flex-column">
      <v-btn @click="changeOrientation">Change orientation</v-btn>
      <input type="text" v-model="opponentMoveFrom" class="ms-4 white--text" />
      <input type="text" v-model="opponentMoveTo" class="ms-4 white--text" />
      <v-btn @click="opponentMove()" color="primary" class="ms-4" dark
        >Move</v-btn
      >
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
      <v-spacer></v-spacer>
      <Resign />
      <OfferDraw />
    </div>
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";
import Resign from "@/components/dialogs/Resign";
import OfferDraw from "@/components/dialogs/OfferDraw";
import Playerbar from "@/components/Playerbar";
export default {
  name: "Humanboard",
  extends: Chessboard,
  components: { Resign, OfferDraw, Playerbar },
  data() {
    return {
      dialog: false,
      radios: "white",
      opponentMoveFrom: "e7",
      opponentMoveTo: "e5",
      orientation: "white",
      pieceColor: "white"
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("clearHistory");
      this.pieceColor = this.radios;
      this.dialog = false;
      this.$store.state.timeWhite = this.$store.state.time;
      this.$store.state.timeBlack = this.$store.state.time;
      this.game.reset();
      this.loadPosition();
      this.board.set({
        fen: this.game.fen(),
        lastMove: null,
        orientation: this.pieceColor
      });

      this.startTimer();
      if (this.pieceColor === "white") {
        this.board.set({
          movable: {
            color: "white",
            events: {
              after: (orig, dest) => {
                this.playerMove(orig, dest);
              }
            }
          }
        });
      } else {
        this.board.set({
          movable: {
            color: null,
            events: {
              after: (orig, dest) => {
                this.playerMove(orig, dest);
              }
            }
          }
        });
      }
    },
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
    playerMove(orig, dest) {
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
  },
  mounted() {
   
  }
};
</script>
