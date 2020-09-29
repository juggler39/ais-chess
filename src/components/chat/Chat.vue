<template>
  <div class="chat-container">
    <h2 class="text-center">Chat</h2>
    <div class="chat grey darken-3">
      <ChatItem
        v-for="(message, index) in getChatHistory"
        :key="index"
        :data="message"
      />
    </div>
    <div class="typer">
      <v-btn icon>
        <v-icon>mdi-emoticon</v-icon>
      </v-btn>
      <input
        v-model="itemData.text"
        type="text"
        class="white--text"
        placeholder="Type here..."
      />
      <v-btn icon class="float-right" @click="send">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import ChatItem from "@/components/chat/ChatItem";
import io from "socket.io-client";
import { mapGetters } from "vuex";

const socket = io("http://localhost:3030/");

export default {
  name: "Chat",
  data() {
    return {
      itemData: {
        text: "",
        name: this.$store.state.loginUser.google.nt.pV,
        time: new Date().toLocaleTimeString()
      }
    };
  },
  components: {
    ChatItem
  },
  methods: {
    send() {
      let data = {
        text: this.itemData.text,
        name: this.$store.state.loginUser.google.nt.pV,
        time: new Date().toLocaleTimeString()
      };
      socket.emit("send", data);
      this.itemData.text = "";
    }
  },
  computed: mapGetters(["getChatHistory"]),
  created() {
    socket.on("add", data => {
      this.$store.dispatch("updateChatHistory", data);
    });
  }
};
</script>

<style scoped>
.typer {
  width: 100%;
}
.typer input[type="text"] {
  width: 60%;
}
.chat {
  height: 40vh;
  padding: 3px;
  overflow-y: scroll;
}
.chat-container {
  padding: 5px;
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #bcc9d2;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #bcc9d2;
}
</style>
