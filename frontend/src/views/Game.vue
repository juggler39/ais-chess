<template>
  <div class="game">
    <h1 v-if="this.$route.params.id" class="text-center">
      This is a play human page. Game
      {{ this.$route.params.id }}
    </h1>
    <v-container>
      <v-row v-if="this.$route.params.id">
        <Humanboard
          ref="humanBoard"
          :gameId="this.$route.params.id"
          :moves="getPVPHistory"
          @gameOver="hideButtons"
        />

        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <div class="history">
              <GameHistory :moves="getPVPHistory" />
            </div>
          </v-card>
          <div class="d-flex ma-2" v-if="gameIsRunning">
            <Resign @resign="resign" />
            <OfferDraw @drawProposal="drawProposal" />
          </div>
          <div class="d-flex ma-2 justify-center" v-if="!gameIsRunning">
            <v-btn color="success" to="/lobby" dark>New game</v-btn>
          </div>
          <v-container>
            <Chat :game="{ id: this.$route.params.id, global: false }" />
          </v-container>
        </v-col>
      </v-row>
      <v-row v-else>
        <h1>
          You have no active game. Please, visit <a href="/lobby">lobby</a> to
          choose or create new game
        </h1>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Humanboard from "@/components/Humanboard";
import Resign from "@/components/dialogs/Resign";
import OfferDraw from "@/components/dialogs/OfferDraw";
import Chat from "@/components/chat/Chat";
import GameHistory from "@/components/chat/GameHistory";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: 12,
      gameIsRunning: true
    };
  },
  components: {
    Chat,
    Humanboard,
    GameHistory,
    Resign,
    OfferDraw
  },
  computed: mapGetters(["getPVPHistory"]),
  methods: {
    redirectToGame() {
      this.$router.push({
        name: "Game",
        params: { id: window.localStorage.getItem("runningGameId") }
      });
    },
    runningGame() {
      return window.localStorage.getItem("runningGameId");
    },
    resign: function() {
      this.$refs.humanBoard.resign();
    },
    drawProposal: function() {
      this.$refs.humanBoard.drawProposal();
    },
    hideButtons() {
      this.gameIsRunning = false;
    }
  },
  created() {
    if (window.localStorage.getItem("playersHistory")) {
      this.$store.dispatch(
        "loadPvPHistory",
        JSON.parse(window.localStorage.getItem("playersHistory"))
      );
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$socket.client.emit("joinRoom", this.$route.params.id);
    } else if (window.localStorage.getItem("runningGameId")) {
      this.redirectToGame();
    }
  }
};
</script>
<style scoped>
.history {
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #bcc9d2;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #bcc9d2;
}
</style>
