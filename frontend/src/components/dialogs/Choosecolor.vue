<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
          New Game
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Choose color</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container fluid>
          <v-radio-group v-model="radios">
            <v-radio label="White" value="white"></v-radio>
            <v-radio label="Black" value="black"></v-radio>
          </v-radio-group>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="submit">OK</v-btn>
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
      radios: "white"
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("clearAIHistory");
      this.$store.state.playAiColor = this.radios;
      this.$store.state.AiStart = true;
      this.dialog = false;
    }
  }
};
</script>
