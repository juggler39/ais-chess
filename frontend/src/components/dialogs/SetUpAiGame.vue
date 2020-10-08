<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="390">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" dark v-bind="attrs" v-on="on">
          New Game
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Set up a new game</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title>Choose color</v-card-title>
        <v-container fluid>
          <v-radio-group v-model="radios">
            <v-radio label="Random" value="random"></v-radio>
            <v-radio label="White" value="white"></v-radio>
            <v-radio label="Black" value="black"></v-radio>
          </v-radio-group>
        </v-container>
        <v-card-title>Choose engine's level</v-card-title>
        <v-card-text>
          <v-row>
            <v-row>
              <v-col class="pr-4">
                <v-slider
                  v-model="slider"
                  class="align-center"
                  :max="max"
                  :min="min"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="slider"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      :max="max"
                      :min="min"
                      type="number"
                      style="width: 40px"
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
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
      radios: "random",
      min: 0,
      max: 20,
      slider: 1
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("clearAIHistory");
      let color = this.radios;
      if (color === "random") {
        color = Math.random() < 0.5 ? "white" : "black";
      }
      this.$store.state.playAiColor = color;
      this.$store.state.engineLevel = this.slider;
      this.$store.state.aiNewGame = true;
      this.$store.state.aiRun = false;
      this.dialog = false;
    }
  }
};
</script>
