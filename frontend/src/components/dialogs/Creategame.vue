<template>
  <div class="create-game">
    <v-btn dark @click="open">
      Create game
    </v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-toolbar dark color="blue-grey darken-1">
          <v-toolbar-title>Create a game</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title class="headline">
          Choose time
        </v-card-title>
        <v-radio-group v-model="time" class="mx-4">
          <v-radio label="10 minutes" value="10"></v-radio>
          <v-radio label="20 minutes" value="20"></v-radio>
          <v-radio label="30 minutes" value="30"></v-radio>
        </v-radio-group>
        <v-card-title class="headline">
          Choose color
        </v-card-title>
        <v-radio-group v-model="color" class="mx-4">
          <v-radio label="Random" value="random"></v-radio>
          <v-radio label="White" value="white"></v-radio>
          <v-radio label="Black" value="black"></v-radio>
        </v-radio-group>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey darken-1" dark @click="send">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      time: "10",
      color: "random"
    };
  },
  methods: {
    open() {
      if (this.$store.state.loginUser) {
        this.dialog = true;
      } else {
        this.$store.dispatch("setRegisterTab", true);
      }
    },
    send() {
      if (this.$store.state.loginUser !== null) {
        this.dialog = false;
        this.$socket.client.emit("newGame", {
          playerID: this.$store.state.idUser,
          playerName: this.$store.state.loginUser,
          time: this.time,
          color: this.color,
          rating: window.localStorage.getItem("userRating")
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.create-game {
  display: flex;
  justify-content: center;
}
</style>
