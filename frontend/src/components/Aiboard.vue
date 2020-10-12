<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar
        :color="opponentColor"
        :username="'StockFish Level ' + $store.state.engineLevel"
        :timer="false"
      />
      <div class="merida">
        <div ref="board" class="cg-board-wrap"></div>
      </div>
      <Playerbar
        :color="pieceColor"
        :username="
          $store.state.loginUser ? $store.state.loginUser : 'Anonymous'
        "
        :timer="false"
      />
    </v-card>
    <Promote
      v-model="promoteDialog"
      :color="pieceColor"
      @piece="getPiece($event)"
    />
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";
import Playerbar from "@/components/Playerbar";

export default {
  name: "PlayAi",
  extends: Chessboard,
  components: { Playerbar },
  data() {
    return {
      aiTurn: false,
      stockfish: null,
      bestMove: {},
      engineTime: "1"
    };
  },
  watch: {
    "$store.state.aiNewGame": function(n) {
      if (n) {
        this.game.reset();
        this.board.set({
          fen: this.game.fen(),
          lastMove: null,
          orientation: this.$store.state.playAiColor,
          movable: {
            dests: this.possibleMoves()
          }
        });
        if (this.$store.state.playAiColor === "white") {
          this.board.set({
            turnColor: "white",
            movable: {
              color: "white",
              events: {
                after: (orig, dest) => {
                  this.humanMove(orig, dest);
                }
              }
            }
          });
        } else {
          this.engineAnalyse();
        }
        this.$store.state.aiNewGame = false;
        this.$store.state.aiRun = true;
      }
    },
    "$store.state.aiRun": function(n) {
      if (n) {
        const level = this.$store.state.engineLevel;
        if (level < 5) {
          this.engineTime = "1";
        } else if (level < 10) {
          this.engineTime = "2";
        } else if (level < 15) {
          this.engineTime = "3";
        } else {
          // Let the engine decide.
          this.engineTime = "";
          this.stockfish.postMessage(
            "setoption name Skill Level value " + level
          );
          //set error value in centipawns
          this.stockfish.postMessage(
            "setoption name Skill Level Maximum Error value " +
              Math.round(level * -40 + 800)
          );
          // set Probability of Success
          this.stockfish.postMessage(
            "setoption name Skill Level Probability value " +
              Math.round(level * 6.35 + 1)
          );
        }
      }
      this.board.set({
        orientation: this.$store.state.playAiColor,
        movable: {
          dests: this.possibleMoves()
        }
      });
      //if the user left the page and then came back, let continue the game
      if (this.aiTurn) {
        this.engineAnalyse();
      } else {
        if (this.$store.state.playAiColor === "white") {
          this.board.set({
            turnColor: "white",
            movable: {
              color: "white",
              events: {
                after: (orig, dest) => {
                  this.humanMove(orig, dest);
                }
              }
            }
          });
        } else {
          this.board.set({
            turnColor: "black",
            movable: {
              color: "black",
              events: {
                after: (orig, dest) => {
                  this.humanMove(orig, dest);
                }
              }
            }
          });
        }
      }
    },
    aiTurn: function(n) {
      if (n) {
        this.aiTurn = false;
        this.game.move(this.bestMove);
        this.AIGameHistory();

        this.board.set({
          fen: this.game.fen(),
          turnColor: this.toColor(),
          animation: {
            duration: 500
          },
          lastMove: [this.bestMove.from, this.bestMove.to],
          movable: {
            color: this.toColor(),
            dests: this.possibleMoves(),
            events: {
              after: (orig, dest) => {
                this.humanMove(orig, dest);
              }
            }
          }
        });
        this.gameOver();
      }
    }
  },
  methods: {
    humanMove(orig, dest) {
      this.game.move({
        from: orig,
        to: dest,
        promotion: this.promote(orig, dest)
      });
      this.AIGameHistory();
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.$store.state.playAiColor,
        movable: {
          color: this.$store.state.playAiColor,
          dests: this.possibleMoves(),
          events: {
            after: this.engineAnalyse()
          }
        }
      });
      this.gameOver();
    },
    engineAnalyse() {
      this.stockfish.postMessage("position startpos moves" + this.getMoves());
      this.stockfish.postMessage(
        "go " + (this.engineTime ? "depth " + this.engineTime : "")
      );
    },
    gameOver() {
      if (this.game.game_over()) {
        this.aiTurn = false;
        const result = this.checkEndReason();
        alert(`Game over!, ${result.color}, ${result.reason}`);
      }
    }
  },
  mounted() {
    //this.promoteDialog = true;
    if (this.moves.length > 0) {
      this.$store.state.aiRun = true;
      this.$store.state.engineLevel = window.localStorage.getItem("aiLevel");
      this.$store.state.playAiColor = window.localStorage.getItem("aiColor");
    }
    this.stockfish = new Worker("js/stockfish.js");
    this.stockfish.onmessage = event => {
      const match = event.data.match(
        /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/
      );
      if (match) {
        this.bestMove = { from: match[1], to: match[2], promotion: match[3] };
        this.aiTurn = true;
      }
    };
    this.stockfish.postMessage("uci");
  },
  destroyed() {
    this.stockfish.terminate();
    this.$store.state.aiRun = false;
    this.$store.state.aiNewGame = false;
  }
};
</script>
