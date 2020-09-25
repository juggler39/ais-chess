<template>
  <div class="game">
    <h1 class="text-center">This is a play human page</h1>
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-9 grey darken-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            eum error animi, accusamus modi rem aliquid eaque quidem placeat, ut
            adipisci dicta. Sequi, quos qui deserunt magnam earum dolor eveniet?
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </p>
        </v-col>
        <v-col class="col-12 col-md-3 grey darken-4">
          <v-card class="mx-auto">
            <h2 class="text-center">Moves</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores quis nostrum nesciunt quas inventore cumque, minima
              debitis temporibus eos eligendi incidunt ipsa at corporis
              voluptatum quod soluta, ab nisi enim?
            </p>
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
import Chat from "@/components/Chat";
export default {
  components: {
    Chat
  }
};
</script>
