<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card>
      <Playerbar
        :color="opponentColor"
        :username="opponent"
        :time="opponentColor === 'white' ? timeWhite : timeBlack"
      />
      <div class="merida">
        <div ref="board" class="cg-board-wrap"></div>
      </div>
      <Playerbar
        :color="pieceColor"
        :username="$store.state.loginUser"
        :time="pieceColor === 'white' ? timeWhite : timeBlack"
      />
    </v-card>
    <Promote ref="Promote" :color="pieceColor" />
    <GameOver ref="GameOver" :result="result.color" :reason="result.reason" />
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";
import Playerbar from "@/components/Playerbar";
import axios from "axios"
export default {
  name: "Humanboard",
  props: ["gameId"],
  extends: Chessboard,
  components: { Playerbar },
  sockets: {
    newMove(data) {
      //here we are getting every new move
      if (data.move.color === "w") {
        this.timeWhite = data.playerTime;
      } else {
        this.timeBlack = data.playerTime;
      }
      this.$store.dispatch("updatePvPHistory", data.move);
      this.opponentMove(data.move);
    },
    allMoves(moves) {
      //here we load all moves for example when page reloaded
      this.$store.dispatch("loadPvPHistory", moves);
    }
  },
  data() {
    return {
      radios: "white",
      opponentMoveFrom: "e7",
      opponentMoveTo: "e5",
      orientation: "white",
      pieceColor: "white",
      gameInfo: [],
      opponent: ""
    };
  },
  methods: {
    resign() {
      console.log("Resign!");
      axios.post('/api/finished-games/finish-game', {
                        game: {
                          id: this.$props.gameId,
                          userLose: window.localStorage.getItem("userID") //here can also take from store
                        }
                      }).then(() => {
                        //somethig else if needed (redirect and etc.)
                      })
    },
    drawProposal() {
      console.log("propose a draw");
    },
    opponentName() {
      if (this.gameInfo.players.player1Name === this.$store.state.loginUser) {
        return this.gameInfo.players.player2Name;
      } else {
        return this.gameInfo.players.player1Name;
      }
    },
    submit() {
      this.$store.dispatch("clearPvPHistory");
      this.$store.dispatch("clearPlayersChatHistory");
      this.timeWhite = this.time;
      this.timeBlack = this.time;
      this.game.reset();
      this.loadPosition();
      this.board.set({
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
    opponentMove(move) {
      this.game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion
      });
      this.board.set({
        fen: this.game.fen(),
        lastMove: [move.from, move.to],
        turnColor: this.toColor(),
        movable: {
          color: this.pieceColor,
          dests: this.possibleMoves()
        }
      });
      this.isGameOver();
    },
    async playerMove(orig, dest) {
      this.game.move({
        from: orig,
        to: dest,
        promotion: await this.promote(orig, dest)
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
  mounted() {
    if (
      !this.$store.state.gameInfo.length &&
      window.localStorage.getItem("gameInfo")
    ) {
      this.$store.dispatch(
        "setGameInfo",
        JSON.parse(window.localStorage.getItem("gameInfo"))
      );
      this.gameInfo = this.$store.getters.getGameInfo;
      if (this.gameInfo.players.player1Name === this.$store.state.loginUser) {
        this.pieceColor = this.gameInfo.players.player1Color;
      } else {
        this.pieceColor = this.gameInfo.players.player2Color;
      }
      this.opponent = this.opponentName();
      this.time = this.gameInfo.timeToGo * 60000;
      this.submit();
    } else {
      this.gameInfo = this.$store.getters.getGameInfo;
    }
  }
};
</script>
