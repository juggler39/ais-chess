export default {
  state: {
    games: []
  },
  mutations: {
    updateGames(state, games) {
      state.games = games;
    }
  },
  actions: {
    updateGamesList(context, game) {
      context.commit("updateGames", game);
    }
  },
  getters: {
    getGames(state) {
      return state.games;
    }
  }
};
