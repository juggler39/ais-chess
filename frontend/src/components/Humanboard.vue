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
    <AcceptDraw ref="AcceptDraw" @drawAccepted="drawAccepted" />
  </v-col>
</template>

<script>
import Chessboard from "./Chessboard";
import Playerbar from "@/components/Playerbar";
import AcceptDraw from "@/components/dialogs/AcceptDraw";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Humanboard",
  extends: Chessboard,
  components: { Playerbar, AcceptDraw },
  sockets: {
    newMove(data) {
      //here we are getting every new move
      if (data.move.color === "w") {
        this.timeWhite = data.playerTime;
      } else {
        this.timeBlack = data.playerTime;
      }
      const color = data.move.color === "w" ? "white" : "black";
      //filtering own moves
      if (color !== this.pieceColor) {
        this.opponentMove(data.move);
      }
    },
    allMoves(moves) {
      //here we load all moves for example when page reloaded
      if (!window.localStorage.getItem("playersHistory")) {
        this.$store.dispatch("loadPvPHistory", moves);
      }
    },
    drawProposal() {
      // here code for draw proposal
      this.$refs.AcceptDraw.pop();
    },
    drawAccepted() {
      this.stopGameAndStoreResult({
        color: "draw",
        reason: "opponents agreed to a draw"
      });
    },
    opponentResign() {
      this.stopGameAndStoreResult({
        color: this.pieceColor,
        reason: "resignation"
      });
    }
  },
  data() {
    return {
      gameInfo: [],
      opponent: ""
    };
  },
  computed: mapGetters(["getPVPHistory"]),
  watch: {
    historyMove: function() {
      this.moveToHistory(this.historyMove);
    }
  },
  props: {
    gameId: {
      type: String
    },
    historyMove: { type: Number }
  },
  methods: {
    resign() {
      this.$socket.client.emit("resign", this.gameInfo.id);
      this.stopGameAndStoreResult({
        color: this.pieceColor === "white" ? "black" : "white",
        reason: "resignation"
      });
    },
    drawProposal() {
      this.$socket.client.emit("draw", this.gameInfo.id);
    },
    drawAccepted() {
      this.$socket.client.emit("accept", this.gameInfo.id);
      this.stopGameAndStoreResult({
        color: "draw",
        reason: "opponents agreed to a draw"
      });
    },
    opponentName() {
      if (this.gameInfo.players.player1Name === this.$store.state.loginUser) {
        return this.gameInfo.players.player2Name;
      } else {
        return this.gameInfo.players.player1Name;
      }
    },
    saveTimer() {
      window.localStorage.setItem(
        "playersTimer",
        JSON.stringify({
          whiteTimer: this.timeWhite,
          blackTimer: this.timeBlack,
          moveTime: Date.now()
        })
      );
    },
    reloadTimer() {
      let playerTimer = JSON.parse(window.localStorage.getItem("playersTimer"));
      if (window.localStorage.getItem("playerTurn") === "white") {
        this.timeBlack = playerTimer.blackTimer;
        this.timeWhite =
          playerTimer.whiteTimer - (Date.now() - playerTimer.moveTime);
      } else {
        this.timeBlack =
          playerTimer.blackTimer - (Date.now() - playerTimer.moveTime);
        this.timeWhite = playerTimer.whiteTimer;
      }
    },
    reloadPlayersTurn() {
      if (this.pieceColor === window.localStorage.getItem("playerTurn")) {
        this.board.set({
          turnColor: this.pieceColor,
          movable: {
            color: this.pieceColor,
            dests: this.possibleMoves(),
            events: {
              after: (orig, dest) => {
                this.playerMove(orig, dest);
              }
            }
          }
        });
      }
    },
    continue() {
      this.reloadTimer();
      this.startTimer();
      this.board.set({
        orientation: this.pieceColor
      });
      this.reloadPlayersTurn();
    },
    submit() {
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
    async stopGameAndStoreResult(result) {
      if (window.localStorage.getItem("runningGameId")) {
        if (!result) result = this.checkEndReason();
        result.playerColor = this.pieceColor === "white" ? "black" : "white";
        this.gameOver(result, window.localStorage.getItem("runningGameId"));

        let finalElo1, finalElo2;

        await axios.get("/api/open-games/open-game-info").then(response => {
          const { data: {game}} = response;
          console.log(game);
          let R1, R2, E1, E2, S1, S2;

          R1 = Math.pow(10, game.players.player1Rating/400);
          R2 = Math.pow(10, game.players.player2Rating/400);

          E1 = R1 / (R1 + R2);
          E2 = R2 / (R2 + R1);

          if (game.players.player1Color === result.color) { 
            S1 = 1;
            S2 = 0;
          } else if ((result.color !== "draw")) {
            S1 = 0;
            S2 = 1;
          }
          else {
            S1 = 0.5;
            S2 = 0.5;
          }
          console.log(S1 + " " + S2);

          finalElo1 = Math.round(game.players.player1Rating + 32 * (S1 - E1));
          finalElo2 = Math.round(game.players.player2Rating + 32 * (S2 - E2));
          console.log(finalElo1);
          console.log(finalElo2);
          if (this.pieceColor === game.players.player1Color) window.localStorage.setItem("userRating", finalElo1);
          else window.localStorage.setItem("userRating", finalElo2);
        });
        if (this.pieceColor === "white") {
          axios
            .post("/api/finished-games/finish-game", {
              game: {
                id: this.$props.gameId,
                winner: result.color,
                timeWhite: this.timeWhite,
                timeBlack: this.timeBlack,
                finalElo1,
                finalElo2
              }
            })
            .then(() => {
              
            });
        }
        window.localStorage.removeItem("gameInfo");
        window.localStorage.removeItem("runningGameId");
        window.localStorage.removeItem("playersHistory");
        clearInterval(this.timer);
        this.$emit("gameOver", true);
      }
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
      if (
        window.localStorage.getItem("runningGameId") !==
        this.$store.state.gameInfo.id
      ) {
        window.localStorage.setItem(
          "runningGameId",
          this.$store.state.gameInfo.id
        );
        this.submit();
        this.saveTimer();
      } else {
        this.continue();
      }
    } else {
      this.gameInfo = this.$store.getters.getGameInfo;
      this.opponent = this.opponentName();
      this.timeWhite = this.gameInfo.timeWhite;
      this.timeBlack = this.gameInfo.timeBlack;
      this.$emit("gameOver", true);
    }
  }
};
</script>
