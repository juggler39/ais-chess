<template>
  <div class="lobby">
    <h1 class="text-center">Game lobby</h1>
    <h2 class="text-center">Choose an open call or create your own game</h2>
    <Creategame class="my-6" />
    <v-row>
      <v-simple-table dark class="col-12 col-md-9">
        <template v-slot:default>
          <thead>
            <tr class="primary">
              <th class="text-left">
                <h2>Player</h2>
              </th>
              <th class="text-left">
                <h2>Time</h2>
              </th>
              <th class="text-left">
                <h2>Color</h2>
              </th>
              <th class="text-left">
                <h2>Game ID</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="game in getGames"
              :key="game.id"
              @click="selectGame(game)"
            >
              <td>{{ game.players.player1Name }}</td>
              <td>{{ game.timeToGo }}</td>
              <td>{{ game.players.player1Color }}</td>
              <td>{{ game.id }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-col class="col-12 col-md-3 grey darken-4">
        <v-container>
          <Chat :game="{ global: true }" />
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Creategame from "@/components/dialogs/Creategame";
import { mapGetters } from "vuex";
import Chat from "@/components/chat/Chat";

export default {
  components: { Creategame, Chat },
  sockets: {
    connect() {
      console.log("connected to server");
    },
    newGameInfo(games) {
      this.$store.dispatch("updateGamesList", games);
      this.$store.getters.getGames.forEach(game => {
        if (game.players.player1Name == this.$store.state.loginUser) {
          this.$socket.client.emit("joinRoom", game.id);
        }
      });
    }
  },
  methods: {
    selectGame(game) {
      if (game.players.player1Name !== this.$store.state.loginUser) {
        this.$socket.client.emit("connectToGame", {
          gameId: game.id,
          player2Name: this.$store.state.loginUser,
          player2ID: this.$store.state.idUser
        });
      }
    }
  },
  computed: mapGetters(["getGames"]),
  mounted() {
    this.$socket.client.emit("loadGames");
  }
};
</script>
