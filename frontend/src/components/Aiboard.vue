<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar
        :color="opponentColor"
        :username="'StockFish Level ' + level"
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
    <Promote ref="Promote" :color="pieceColor" />
    <GameOver ref="GameOver" :result="result.color" :reason="result.reason" />
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
      color: "white",
      level: 0,
      aiTurn: false,
      stockfish: null,
      bestMove: {}
    };
  },
  computed: {
    engineDepth: function() {
      if (this.level < 5) {
        return 1;
      } else if (this.level < 10) {
        return 5;
      } else if (this.level < 15) {
        return 10;
      } else {
        return 12;
      }
    }
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
        this.prepareEngine();
        this.game.reset();
        this.board.set({
          fen: this.game.fen(),
          lastMove: null,
          orientation: this.color
        });
        if (this.color === "white") {
          this.setMovableColor("white");
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
          lastMove: [this.bestMove.from, this.bestMove.to]
        });
        this.setMovableColor(this.toColor());
        this.isGameOver();
      }
    }
  },
  methods: {
    async humanMove(orig, dest) {
      this.game.move({
        from: orig,
        to: dest,
        promotion: await this.promote(orig, dest)
      });
      this.AIGameHistory();
      this.board.set({
        turnColor: this.color,
        movable: {
          color: this.color,
          dests: this.possibleMoves(),
          events: {
            after: this.engineAnalyse()
          }
        }
      });
      this.isGameOver();
    },
    engineAnalyse() {
      this.stockfish.postMessage("position startpos moves" + this.getMoves());
      this.stockfish.postMessage(
        "go " + (this.engineDepth ? "depth " + this.engineDepth : "")
      );
    },
    prepareEngine() {
      this.stockfish.postMessage(
        "setoption name Skill Level value " + this.level
      );
      //set error value in centipawns
      this.stockfish.postMessage(
        "setoption name Skill Level Maximum Error value " +
          this.level * -20 +
          400
      );
      // set Probability of Success
      this.stockfish.postMessage(
        "setoption name Skill Level Probability value " +
          Math.round(this.level * 6.35 + 1)
      );
    },
    continueGame() {
      //if the user left the page and then came back, let continue the game
      this.board.set({
        orientation: this.color
      });
      if (this.aiTurn) {
        this.engineAnalyse();
      } else {
        if (this.color === "white") {
          this.setMovableColor("white");
        } else {
          this.setMovableColor("black");
        }
      }
    },
    setMovableColor(color) {
      this.board.set({
        turnColor: color,
        movable: {
          dests: this.possibleMoves(),
          color: color,
          events: {
            after: (orig, dest) => {
              this.humanMove(orig, dest);
            }
          }
        }
      });
    },

    isGameOver() {
      if (this.game.game_over()) {
        this.result = this.checkEndReason();
        this.$refs.GameOver.pop();
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
    if (this.moves.length > 0) {
      this.level = window.localStorage.getItem("aiLevel");
      this.color = window.localStorage.getItem("aiColor");
      this.aiTurn = JSON.parse(window.localStorage.getItem("aiTurn"));
      this.prepareEngine();
      this.continueGame();
    }
  },
  destroyed() {
    this.stockfish.terminate();
  }
};
</script>
