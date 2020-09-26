<template>
  <div class="game">
    <h1 class="text-center">This is a play human page</h1>
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-9 grey darken-4 d-flex justify-center">
          <Chessboard />
        </v-col>
        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <ul>
              <li
                v-for="(move, index) in $store.state.gameHistory"
                v-bind:key="index"
              >
                {{ move }}
              </li>
            </ul>
          </v-card>
          <v-container>
            <h2 class="text-center">Chat</h2>
            <Chat />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Chessboard from "@/components/Chessboard";
import Chat from "@/components/Chat";
export default {
  components: {
    Chat,
    Chessboard
  }
};
</script>
