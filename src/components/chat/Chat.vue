<template>
  <v-container class="grey darken-3">
    <v-row>
      <v-col>
        <div class="chat-container grey darken-2 pa-4 mb-4">
          <span>Hello</span><br />
          <span class="float-right">Hello</span><br />
          <span>How are you?</span><br />
          <span class="float-right">Fine, thank you</span><br />
        </div>
        <div class="typer">
          <v-btn icon>
            <v-icon>mdi-emoticon</v-icon>
          </v-btn>
          <input type="text" class="white--text" placeholder="Type here..." />
          <v-btn icon class="float-right">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Chat"
};
</script>

<style scoped>
.typer {
  width: 100%;
}
.typer input[type="text"] {
  width: 60%;
}
.chat-container {
  height: 40vh;
}
</style>
