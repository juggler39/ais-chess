<script>
import Chessboard from "./Chessboard";

export default {
  name: "PlayAi",
  extends: Chessboard,
  data() {
    return {
      aiTurn: false,
      stockfish: null,
      bestMove: {},
      engineTime: "1"
    };
  },
  watch: {
    "$store.state.aiStart": function(n) {
      if (n) {
        if (window.Worker) {
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
            //Stockfish level 20 does not make errors (intentially), so these numbers have no effect on level 20.
            //Level 0 starts at 1
            this.stockfish.postMessage(
              "setoption name Skill Level Maximum Error value " +
                Math.round(level * -0.5 + 10)
            );
            // Level 0 starts at 10
            this.stockfish.postMessage(
              "setoption name Skill Level Probability value " +
                Math.round(level * 6.35 + 1)
            );
          }
        }
        let color = this.$store.state.playAiColor;
        this.game.reset();
        this.board.set({
          fen: this.game.fen(),
          lastMove: null,
          orientation: color,
          movable: {
            dests: this.possibleMoves()
          }
        });
        if (color === "white") {
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
      }
      this.$store.state.aiStart = false;
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
    if (window.Worker) {
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
    } else {
      // Sorry! No Web Worker support..
    }
  },
  destroyed() {
    if (window.Worker) {
      this.stockfish.terminate();
    }
  }
};
</script>
