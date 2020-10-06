<script>
import Chessboard from "./Chessboard";

export default {
  name: "PlayAi",
  extends: Chessboard,
  data() {
    return {
      aiTurn: false,
      stockfish: null,
      bestMove: {}
    };
  },
  watch: {
    "$store.state.AiStart": function(n) {
      if (n) {
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
          this.stockfish.postMessage(
            "position startpos moves" + this.getMoves()
          );
          this.stockfish.postMessage("go depth 12");
        }
      }
      this.$store.state.AiStart = false;
    },
    aiTurn: function(n) {
      if (n) {
        this.aiTurn = false;
        this.game.move(this.bestMove);
        this.gameHistory();

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
      this.gameHistory();
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.$store.state.playAiColor,
        movable: {
          color: this.$store.state.playAiColor,
          dests: this.possibleMoves(),
          events: {
            after:
              (this.stockfish.postMessage(
                "position startpos moves" + this.getMoves()
              ),
              this.stockfish.postMessage("go depth 12"))
          }
        }
      });
      this.gameOver();
    },
    gameOver() {
      if (this.game.game_over()) {
        this.$store.dispatch("clearHistory");
        this.aiTurn = false;
        const result = this.checkEndReason();
        alert(`Game over!, ${result.color}, ${result.reason}`);
      }
    }
  },
  created() {
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
  }
};
</script>
