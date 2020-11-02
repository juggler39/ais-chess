<template>
  <div class="game">
    <h1 class="text-center">Play against the Artificial Intelligence</h1>
    <v-container>
      <v-row>
        <Aiboard
          ref="Aiboard"
          v-bind:moves="getAIHistory"
          v-bind:newGame="newGame"
          v-bind:historyMove="historyMove"
          @newGame="newGame.start = $event"
        />
        <v-col class="col-12 col-md-3 grey darken-4">
          <GameHistory
            v-bind:moves="getAIHistory"
            @historyMove="historyMove = $event"
          />
          <v-container>
            <SetUpAiGame @newGame="newGame = $event" />
          </v-container>
          <v-img :src="require('@/assets/giphy.webp')"></v-img>
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
  data() {
    return {
      newGame: {
        start: false,
        color: "",
        level: 1
      },
      historyMove: 0
    };
  },
  methods: {},
  created() {
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
