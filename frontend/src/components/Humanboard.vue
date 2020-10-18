<template>
  <v-col
    class="col-12 col-md-9 grey darken-4 d-flex justify-center flex-column align-center"
  >
    <v-card class="col-12 col-md-8">
      <Playerbar
        :color="opponentColor"
        :username="opponent"
        :time="opponentColor === 'white' ? timeWhite : timeBlack"
      />
      <div class="board-container">
        <div class="merida">
          <div ref="board" class="cg-board-wrap"></div>
        </div>
      </div>
      <Playerbar
        :color="pieceColor"
        :username="$store.state.loginUser"
        :time="pieceColor === 'white' ? timeWhite : timeBlack"
      />
    </v-card>
    <Promote ref="Promote" :color="pieceColor" />
    <GameOver ref="GameOver" />
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";
import Playerbar from "@/components/Playerbar";
import axios from "axios";
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
      pieceColor: "white",
      gameInfo: [],
      opponent: ""
    };
  },
  methods: {
    resign() {
      this.stopGameAndStoreResult({
        color: this.pieceColor === "white" ? "black" : "white",
        reason: "resignation"
      });
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
        this.setMovableColor("white");
      } else {
        this.setMovableColor(null);
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
      if (this.game.game_over()) {
        this.stopGameAndStoreResult();
      }
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
      if (this.game.game_over()) {
        this.stopGameAndStoreResult();
      }
    },
    stopGameAndStoreResult(result) {
      if (!result) result = this.checkEndReason();
      this.gameOver(result);
      if (this.pieceColor === "white") {
        axios
          .post("/api/finished-games/finish-game", {
            game: {
              id: this.$props.gameId,
              userLose: window.localStorage.getItem("userID") //here can also take from store
              //color: color who wins: white, black or draw
              //timeWhite: this.timeWhite,
              //timeBlack: this.timeBlack
            }
          })
          .then(() => {
            //somethig else if needed (redirect and etc.)
          });
      }

      window.localStorage.removeItem("gameInfo");
      clearInterval(this.timer);
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
