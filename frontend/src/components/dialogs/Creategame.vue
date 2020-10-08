<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
          Create game
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
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
          <v-btn color="success" dark @click="send">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
    send() {
      this.dialog = false;
      this.$socket.client.emit("newGame", {
        playerID: this.$store.state.idUser,
        playerName: this.$store.state.loginUser,
        time: this.time,
        color: this.color
      });
    }
  }
};
</script>
