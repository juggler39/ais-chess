export default {
  state: {
    gameHistory: []
  },
  mutations: {
    updateGameHistory(state, turn) {
      state.gameHistory.unshift(turn);
    }
  },
  actions: {
    updateHistory(context, turn) {
      context.commit("updateGameHistory", turn);
    }
  },
  getters: {
    getHistory(state) {
      return state.gameHistory;
    }
  }
};
