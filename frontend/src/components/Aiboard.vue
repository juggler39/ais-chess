<script>
import Chessboard from "./Chessboard";

export default {
  name: "PlayAi",
  extends: Chessboard,
  data() {
    return {
      aiTurn: false
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
          this.aiTurn = true;
        }
      }
      this.$store.state.AiStart = false;
    },
    aiTurn: function(n) {
      if (n) {
        this.aiTurn = false;
        let moves = this.game.moves({ verbose: true });
        let randomMove = moves[Math.floor(Math.random() * moves.length)];
        this.game.move(randomMove);
        console.log(randomMove);
        if (this.game.history().length % 2 === 0) {
          let move = [
            this.game
              .history({ verbose: true })
              .slice(this.game.history().length - 2, this.game.history().length)
          ];
          this.updateHistory(move);
        }
        this.board.set({
          fen: this.game.fen(),
          turnColor: this.toColor(),
          animation: {
            duration: 500
          },
          lastMove: [randomMove.from, randomMove.to],
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
      if (this.game.history().length % 2 === 0) {
        let move = [
          this.game
            .history({ verbose: true })
            .slice(this.game.history().length - 2, this.game.history().length)
        ];
        this.updateHistory(move);
      }
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.$store.state.playAiColor,
        movable: {
          color: this.$store.state.playAiColor,
          dests: this.possibleMoves(),
          events: { after: (this.aiTurn = true) }
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
    let stockfish = new Worker("js/stockfish.js");
    stockfish.onmessage = function onmessage(event) {
      const match = event.data.match(
        /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/
      );
      if (match) console.log("match: " + match);
    };
    stockfish.postMessage("uci");
    stockfish.postMessage("ucinewgame");
    stockfish.postMessage("go depth 15");
  }
};
</script>
