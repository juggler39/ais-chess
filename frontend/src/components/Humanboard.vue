<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar :color="opponentColor" />
      <div class="merida">
        <div ref="board" class="cg-board-wrap"></div>
      </div>
      <Playerbar :color="pieceColor" :username="$store.state.loginUser" />
    </v-card>
    <Promote
      v-model="promoteDialog"
      :color="pieceColor"
      @piece="getPiece($event)"
    />
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
  props: ["gameId"],
  extends: Chessboard,
  components: { Resign, OfferDraw, Playerbar },
  sockets: {
    newMove(move) {
      //here we gotting every new move
      this.$store.dispatch("updatePvPHistory", move);
    },
    allMoves(moves) {
      //here we load all moves for example when page reloaded
      this.$store.dispatch("loadPvPHistory", moves);
    }
  },
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
      this.$store.dispatch("clearPvPHistory");
      this.$store.dispatch("clearPlayersChatHistory");
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
      this.game.move({ from: this.opponentMoveFrom, to: this.opponentMoveTo });
      this.PvPGameHistory(this.$props.gameId);
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
      this.game.move({
        from: orig,
        to: dest,
        promotion: this.promote(orig, dest)
      });
      this.PvPGameHistory(this.$props.gameId);
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: null,
          dests: this.possibleMoves()
        }
      });
    }
  },
  mounted() {}
};
</script>
