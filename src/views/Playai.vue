<template>
  <div class="game">
    <h1 class="text-center">Play against the Artificial Intelligence</h1>
    <v-container>
      <v-row>
        <Aiboard />
        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores quis nostrum nesciunt quas inventore cumque, minima
              debitis temporibus eos eligendi incidunt ipsa at corporis
              voluptatum quod soluta, ab nisi enim? sdadasd
            </p>
          </v-card>
          <v-container>
            <Choosecolor />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Aiboard from "@/components/Aiboard";
import Choosecolor from "@/components/dialogs/Choosecolor";

export default {
  components: {
    Aiboard,
    Choosecolor
  }
};
</script>
