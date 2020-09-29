export default {
  state: {
    chatHistory: [],
    gameHistory: []
  },
  mutations: {
    updateGameHistory(state, turn) {
      state.gameHistory.unshift(turn);
    },
    updateChatHistory(state, message) {
      state.chatHistory.push(message);
    }
  },
  actions: {
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