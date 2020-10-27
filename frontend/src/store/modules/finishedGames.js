export default {
  state: {
    finishedGames: []
  },
  mutations: {
    updateFinishedGames(state, games) {
      state.finishedGames = games;
    }
  },
  actions: {
    updateFinishedGamesList(context, games) {
      context.commit("updateFinishedGames", games);
    }
  },
  getters: {
    getFinishedGames(state) {
      return state.finishedGames;
    }
  }
};
