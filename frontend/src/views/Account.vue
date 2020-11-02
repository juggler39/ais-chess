<template>
  <div class="account">
    <h1>User Profile</h1>
    <v-container class="my-6">
      <v-row>
        <v-col class="col-12 col-md-5">
          <Avatar :avatar="avatar" />
        </v-col>
        <v-col outline class="col-12 col-md-7">
          <v-card class="mb-2">
            <v-list>
              <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-content>
                  {{ item.title }}
                  {{ item.content }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <FormDialog
            :username.sync="items[0].content"
            :email.sync="items[1].content"
            :password.sync="password"
            :bio.sync="items[2].content"
          />
        </v-col>
      </v-row>
      <v-container v-if="gamesPlayed.length">
        <v-simple-table dark class="col-12 col-md-9">
          <template v-slot:default>
            <thead>
              <tr class="primary">
                <th class="text-left">
                  <h2>Players</h2>
                </th>
                <th class="text-left">
                  <h2>Winner</h2>
                </th>
                <th class="text-left">
                  <h2>Time</h2>
                </th>
                <th class="text-left">
                  <h2>Moves</h2>
                </th>
                <th class="text-left">
                  <h2>Game date</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="game in gamesPlayed"
                :key="game.date"
                @click="inspectGame(game)"
              >
                <td>
                  <span class="player"
                    ><div class="white"></div>
                    {{
                      game.players.player1Color === "white"
                        ? game.players.player1Name
                        : game.players.player2Name
                    }}</span
                  >
                  <span class="player"
                    ><div class="black"></div>
                    {{
                      game.players.player1Color === "black"
                        ? game.players.player1Name
                        : game.players.player2Name
                    }}</span
                  >
                </td>
                <td>
                  <span>{{
                    game.winner === "white"
                      ? 1
                      : game.winner === "draw"
                      ? "1/2"
                      : 0
                  }}</span>
                  <br />
                  <span>{{
                    game.winner === "black"
                      ? 1
                      : game.winner === "draw"
                      ? "1/2"
                      : 0
                  }}</span>
                </td>
                <td>{{ game.timeToGo }}</td>
                <td>{{ game.moves.length }}</td>
                <td>{{ game.gameDate }}</td>
                <td>{{ game.rating }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
      <h3 v-else>no games found</h3>
    </v-container>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import FormDialog from "@/components/FormDialog";
import axios from "axios";

export default {
  name: "Account",
  components: { Avatar, FormDialog },
  data() {
    return {
      dialog: false,
      password: "",
      avatar: {},
      gamesPlayed: [],
      items: [
        { title: "Name: ", content: "" },
        { title: "Rating: ", content: "" },
        { title: "Email: ", content: "" },
        { title: "Bio: ", content: "" }
      ]
    };
  },
  methods: {
    inspectGame(game) {
      this.$router.push({ name: "Game", params: { id: game.id } });
    }
  },
  mounted() {
    axios.get("/api/users/info").then(response => {
      const {
        data: { user }
      } = response;
      this.avatar = user.logo;
      this.items[0].content = user.name;
      this.items[1].content = user.rating;
      this.items[2].content = user.email;
      this.items[3].content = user.bio;
    });
    axios.get("/api/finished-games/get-played-games").then(response => {
      const {
        data: { games }
      } = response;
      if (games[0] !== "No played games") {
        this.gamesPlayed = games;
        this.$store.dispatch("updateFinishedGamesList", games);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.v-list-item {
  &:not(:last-child) {
    border-bottom: 1px solid #181818;
  }
}
.white {
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background-color: #fff;
}
.black {
  margin-right: 5px;
  width: 12px;
  height: 12px;
  background-color: #000;
}
.player {
  display: flex;
  align-items: center;
}
</style>
