<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar
        :color="opponentColor"
        :username="'StockFish Level ' + newGame.level"
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
  name: "Aiboard",
  extends: Chessboard,
  components: { Playerbar },
  data() {
    return {
      color: "",
      level: 0,
      aiTurn: false,
      stockfish: null,
      bestMove: {},
      engineTime: "1"
    };
  },
  props: {
    newGame: {
      type: Object,
      default: function() {
        return { start: false, color: "", level: 1 };
      }
    }
  },
  watch: {
    "newGame.start": function(n) {
      if (n) {
        this.color = this.newGame.color;
        this.level = this.newGame.level;
        this.game.reset();
        this.board.set({
          fen: this.game.fen(),
          lastMove: null,
          orientation: this.color,
          movable: {
            dests: this.possibleMoves()
          }
        });
        if (this.color === "white") {
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
        this.$emit("newGame", false);
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
        turnColor: this.newGame.color,
        movable: {
          color: this.newGame.color,
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
    runEngine() {
      const level = this.level;
      if (level < 5) {
        this.engineTime = "1";
      } else if (level < 10) {
        this.engineTime = "2";
      } else if (level < 15) {
        this.engineTime = "3";
      } else {
        // Let the engine decide.
        this.engineTime = "";
        this.stockfish.postMessage("setoption name Skill Level value " + level);
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
      this.board.set({
        orientation: this.color,
        movable: {
          dests: this.possibleMoves()
        }
      });
      //if the user left the page and then came back, let continue the game
      if (this.aiTurn) {
        this.engineAnalyse();
      } else {
        if (this.color === "white") {
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
    gameOver() {
      if (this.game.game_over()) {
        this.aiTurn = false;
        const result = this.checkEndReason();
        alert(`Game over!, ${result.color}, ${result.reason}`);
      }
    },
    AIGameHistory() {
      let move = this.game.history({ verbose: true }).pop();
      this.$store.dispatch("updateAIHistory", move);
      window.localStorage.setItem("aiLevel", this.level);
      window.localStorage.setItem("aiColor", this.color);
      window.localStorage.setItem("aiTurn", this.aiTurn);
      window.localStorage.setItem(
        "history",
        JSON.stringify(this.$store.getters.getAIHistory)
      );
    }
  },

  mounted() {
    if (this.moves.length > 0) {
      this.level = window.localStorage.getItem("aiLevel");
      this.color = window.localStorage.getItem("aiColor");
      this.aiTurn = JSON.parse(window.localStorage.getItem("aiTurn"));
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
    this.runEngine();
  },
  destroyed() {
    this.stockfish.terminate();
  }
};
</script>
