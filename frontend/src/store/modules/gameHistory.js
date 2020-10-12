export default {
  state: {
    globalChatHistory: [],
    playersChatHistory: [],
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
    clearPlayersChatHistory(state) {
      state.playersChatHistory = [];
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
    loadPlayersChatHistory(state, messages) {
      state.playersChatHistory = messages;
    },
    updatePlayersChatHistory(state, message) {
      state.playersChatHistory.push(message);
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
    clearPlayersChatHistory(context) {
      context.commit("clearPlayersChatHistory");
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
    loadPlayersChatHistory(context, messages) {
      context.commit("loadPlayersChatHistory", messages);
    },
    updatePlayersChatHistory(context, message) {
      context.commit("updatePlayersChatHistory", message);
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
    },
    getPlayersChatHistory(state) {
      return state.playersChatHistory;
    }
  }
};
