<template>
  <div class="chat-container">
    <h2 class="text-center chat-header">Chat</h2>
    <div class="chat darken-3" ref="chat">
      <ChatItem
        v-for="(message, index) in getChat()"
        :key="index"
        :data="message"
      />
    </div>
    <div class="typer">
      <v-btn icon class="typer-btn" @click="toogleDialogEmoji" ref="button">
        <v-icon>mdi-emoticon</v-icon>
      </v-btn>
      <input
        v-model="itemData.text"
        v-on:keyup.enter="send"
        type="text"
        class="white--text"
        placeholder="Type here..."
      />
      <v-btn icon class="float-right" @click="send">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
    <VEmojiPicker
      v-show="showDialog"
      dark="true"
      emojiSize="26"
      emojisByRow="7"
      continuousList="true"
      labelSearch="Search"
      @select="onSelectEmoji"
    />
  </div>
</template>

<script>
import ChatItem from "@/components/chat/ChatItem";
import { VEmojiPicker } from "v-emoji-picker";
//import { mapGetters } from "vuex";

export default {
  name: "Chat",
  props: ["game"],
  sockets: {
    add(value) {
      if (this.$props.game.global) {
        this.$store.dispatch("updateGlobalChatHistory", value);
        this.itemData.text = "";
      }
    },
    allMessages(messages) {
      if (this.$props.game.global) {
        this.$store.dispatch("loadGlobalChatHistory", messages);
      }
    },
    playersChat(messages) {
      this.$store.dispatch("loadPlayersChatHistory", messages);
    },
    newMessage(message) {
      this.$store.dispatch("updatePlayersChatHistory", message);
      this.itemData.text = "";
    }
  },
  data() {
    return {
      showDialog: false,
      itemData: {
        text: "",
        name: this.$store.state.loginUser,
        time: new Date()
      }
    };
  },
  components: {
    ChatItem,
    VEmojiPicker
  },
  methods: {
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(emoji) {
      this.itemData.text += emoji.data;
    },
    onClose() {
      this.showDialog = false;
    },
    getChat() {
      if (this.$props.game.global) {
        return this.$store.getters.getGlobalChatHistory;
      } else {
        return this.$store.getters.getPlayersChatHistory;
      }
    },
    send() {
      let data = {
        message: this.itemData.text,
        userName: this.$store.state.loginUser.split(" ")[0],
        id: this.$store.state.idUser,
        time: new Date().toLocaleTimeString()
      };
      if (this.$props.game.global) {
        this.$socket.client.emit("send", data);
      } else {
        this.$socket.client.emit("playerMessage", {
          message: data,
          id: this.$props.game.id
        });
      }

      this.showDialog = false;
    },
    scrollToEnd() {
      const content = this.$refs.chat;
      content.scrollTop = content.scrollHeight;
    }
  },
  updated() {
    this.scrollToEnd();
  },
  mounted() {
    if (this.$props.game.global) {
      this.$socket.client.emit("getGlobalChatMessages");
    }

    this.scrollToEnd();
  },
  created() {
    window.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.showDialog = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.chat-container {
  position: relative;

  @media (max-width: 959.99px) {
    background-color: #000000;
  }

  .chat-header {
    padding: 8px;
    opacity: 0.7;
    font-size: 20px;
  }

  .emoji-picker {
    position: absolute;
    bottom: 0px;
    right: 100%;

    @media (max-width: 959.99px) {
      left: 0;
      bottom: 50px;
    }
  }
}

.typer {
  display: flex;
  input[type="text"] {
    width: 80%;
  }
}

.chat {
  height: 40vh;
  padding: 5px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 7px;
  cursor: pointer;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(59, 59, 59, 0.8);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(44, 44, 44, 0.5);
}
</style>
