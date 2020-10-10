<template>
  <div class="game">
    <h1 class="text-center">Play against the Artificial Intelligence</h1>
    <v-container>
      <v-row>
        <Aiboard v-bind:moves="getAIHistory" />
        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <div class="history">
              <GameHistory v-bind:moves="getAIHistory" />
            </div>
          </v-card>
          <v-container>
            <SetUpAiGame />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Aiboard from "@/components/Aiboard";
import SetUpAiGame from "@/components/dialogs/SetUpAiGame";
import GameHistory from "@/components/chat/GameHistory";
import { mapGetters } from "vuex";

export default {
  components: {
    Aiboard,
    SetUpAiGame,
    GameHistory
  },
  sockets: {
    startGame(game) {
      this.$router.push({ name: "Game", params: { id: game[0].id } });
    }
  },
  methods: {},
  mounted() {
    if (window.localStorage.getItem("history")) {
      this.$store.dispatch(
        "loadAIHistory",
        JSON.parse(window.localStorage.getItem("history"))
      );
    }
  },
  computed: mapGetters(["getAIHistory"])
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
