<template>
  <div class="game">
    <h1 class="text-center">
      This is a play human page. Game
      {{ `${this.$route.params.id ? this.$route.params.id : "test"}` }}
    </h1>
    <v-container>
      <v-row>
        <Humanboard />

        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <div class="history">
              <GameHistory v-bind:moves="getPVPHistory" />
            </div>
          </v-card>
          <v-container>
            <Chat :global="false" />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Humanboard from "@/components/Humanboard";
import Chat from "@/components/chat/Chat";
import GameHistory from "@/components/chat/GameHistory";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: 12
    };
  },
  components: {
    Chat,
    Humanboard,
    GameHistory
  },
  computed: mapGetters(["getPVPHistory"]),
  mounted() {
    console.log("reconected to room");
    this.$socket.client.emit("joinRoom", this.$route.params.id);
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
