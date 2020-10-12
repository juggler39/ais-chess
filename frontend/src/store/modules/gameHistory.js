export default {
  state: {
    globalChatHistory: [],
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
    clearGlobalChatHistory(state) {
      state.globalChatHistory = [];
    },
    updateAIGameHistory(state, turn) {
      state.AIGameHistory.push(turn);
    },
    updatePvPGameHistory(state, turn) {
      state.PvPGameHistory.push(turn);
    },
    loadGlobalChatHistory(state, messages) {
      state.globalChatHistory = messages;
    },
    updateGlobalChatHistory(state, message) {
      state.globalChatHistory.push(message);
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
    clearGlobalChatHistory(context) {
      context.commit("clearGlobalChatHistory");
    },
    updateAIHistory(context, turn) {
      context.commit("updateAIGameHistory", turn);
    },
    updatePvPHistory(context, turn) {
      context.commit("updatePvPGameHistory", turn);
    },
    loadGlobalChatHistory(context, messages) {
      context.commit("loadGlobalChatHistory", messages);
    },
    updateGlobalChatHistory(context, message) {
      context.commit("updateGlobalChatHistory", message);
    }
  },
  getters: {
    getAIHistory(state) {
      return state.AIGameHistory;
    },
    getPVPHistory(state) {
      return state.PvPGameHistory;
    },
    getGlobalChatHistory(state) {
      return state.globalChatHistory;
    }
  }
};
