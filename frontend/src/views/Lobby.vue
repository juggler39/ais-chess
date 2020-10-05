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
          <tr v-for="game in games" :key="game.id" @click="selectGame(game.id)">
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
export default {
  components: { Creategame },
  data() {
    return {
      games: [
        {
          player: "Test",
          time: "10 minutes",
          color: "white",
          id: 123123121
        },
        {
          player: "Илья",
          time: "10 minutes",
          color: "black",
          id: 123123122
        },
        {
          player: "Денис",
          time: "10 minutes",
          color: "random",
          id: 1231123123
        },
        {
          player: "Сергей",
          time: "20 minutes",
          color: "white",
          id: 1231123124
        },
        {
          player: "Таня",
          time: "10 minutes",
          color: "white",
          id: 1231123125
        },
        {
          player: "Test",
          time: "10 minutes",
          color: "white",
          id: 1231123126
        }
      ]
    };
  },
  methods: {
    selectGame(id) {
      console.log(id);
    }
  }
};
</script>
