export default {
  state: {
    chatHistory: [],
    AIGameHistory: [],
    PvPGameHistory: []
  },
  mutations: {
    loadAIHistory(state, history) {
      state.AIGameHistory = history;
    },
    clearAIGameHistory(state) {
      state.AIGameHistory = [];
    },
    clearPvPGameHistory(state) {
      state.PvPGameHistory = [];
    },
    clearChatHistory(state) {
      state.chatHistory = [];
    },
    updateAIGameHistory(state, turn) {
      state.AIGameHistory.push(turn);
    },
    updatePvPGameHistory(state, turn) {
      state.PvPGameHistory.push(turn);
    },
    updateChatHistory(state, message) {
      state.chatHistory.push(message);
    }
  },
  actions: {
    loadAIHistory(context, history) {
      context.commit("loadAIHistory", history);
    },
    clearAIHistory(context) {
      context.commit("clearAIGameHistory");
    },
    clearPvPHistory(context) {
      context.commit("clearPvPGameHistory");
    },
    clearChatHistory(context) {
      context.commit("clearChatHistory");
    },
    updateAIHistory(context, turn) {
      context.commit("updateAIGameHistory", turn);
    },
    updatePvPHistory(context, turn) {
      context.commit("updatePvPGameHistory", turn);
    },
    updateChatHistory(context, message) {
      context.commit("updateChatHistory", message);
    }
  },
  getters: {
    getAIHistory(state) {
      return state.AIGameHistory;
    },
    getPVPHistory(state) {
      return state.PvPGameHistory;
    },
    getChatHistory(state) {
      return state.chatHistory;
    }
  }
};
