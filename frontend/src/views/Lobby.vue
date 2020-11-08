<template>
  <div class="lobby">
    <h1 class="text-center">Game lobby</h1>
    <h2 class="text-center">Choose an open call or create your own game</h2>
    <Creategame class="my-6" />
    <div class="lobby-container">
      <v-simple-table class="col-sm-12 col-md-8 transparent">
        <template v-slot:default>
          <thead class="table-head">
            <tr>
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
      <v-col class="col-sm-12 col-md-4 pa-0">
        <Chat :game="{ global: true }" />
      </v-col>
    </div>
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
      if (
        game.players.player1Name !== this.$store.state.loginUser &&
        this.$store.state.loginUser !== null
      ) {
        this.$socket.client.emit("connectToGame", {
          gameId: game.id,
          player2Name: this.$store.state.loginUser,
          player2ID: this.$store.state.idUser,
          player2Rating: window.localStorage.getItem("userRating")
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

<style lang="scss" scoped>
.lobby-container {
  border: 3px solid #272727;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.9);
  display: flex;

  @media (max-width: 959.99px) {
    flex-direction: column;
  }

  @media (max-width: 575.98px) {
    margin: 0 10px;
  }

  .v-data-table {
    padding: 0 !important;
    border-right: 3px solid #272727 !important;
    border-radius: 0;

    @media (max-width: 959.99px) {
      border-right: none !important;
      border-bottom: 3px solid #272727 !important;
    }

    .table-head th {
      @media (max-width: 575.98px) {
        padding: 5px;
      }

      h2 {
        @media (max-width: 575.98px) {
          font-size: 14px;
        }
      }
    }

    tbody td {
      @media (max-width: 575.98px) {
        font-size: 12px;
        padding: 5px;
      }
    }

    ::-webkit-scrollbar {
      height: 7px;
      cursor: pointer;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(59, 59, 59, 0.8);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(44, 44, 44, 0.5);
    }
  }
}
</style>
