<template>
  <div class="lobby">
    <h1 class="text-center">Game lobby</h1>
    <h2 class="text-center">Choose an open call or create your own game</h2>
    <Creategame class="my-6" />
    <v-simple-table dark>
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
            @click="selectGame(game.id)"
          >
            <td>{{ game.player }}</td>
            <td>{{ game.time }}</td>
            <td>{{ game.color }}</td>
            <td>{{ game.id }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Creategame from "@/components/dialogs/Creategame";
import { mapGetters } from "vuex";

export default {
  components: { Creategame },
  sockets: {
    newGameInfo(games) {
      console.log(games);
      this.$store.dispatch("updateGamesList", games);
    }
  },
  methods: {
    selectGame(id) {
      console.log(id);
    }
  },
  computed: mapGetters(["getGames"]),
  mounted() {
    this.$socket.client.emit("loadGames");
  }
};
</script>
