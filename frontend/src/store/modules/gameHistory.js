export default {
  state: {
    chatHistory: [],
    gameHistory: []
  },
  mutations: {
    clearGameHistory(state) {
      state.gameHistory = [];
    },
    clearChatHistory(state) {
      state.chatHistory = [];
    },
    updateGameHistory(state, turn) {
      state.gameHistory.unshift(turn);
    },
    updateChatHistory(state, message) {
      state.chatHistory.push(message);
    }
  },
  actions: {
    clearHistory(context) {
      context.commit("clearGameHistory");
    },
    clearChatHistory(context) {
      context.commit("clearChatHistory");
    },
    updateHistory(context, turn) {
      context.commit("updateGameHistory", turn);
    },
    updateChatHistory(context, message) {
      context.commit("updateChatHistory", message);
    }
  },
  getters: {
    getHistory(state) {
      return state.gameHistory;
    },
    getChatHistory(state) {
      return state.chatHistory;
    }
  }
};
