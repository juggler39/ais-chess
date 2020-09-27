import Vue from "vue";
import Vuex from "vuex";
import gameHistory from "./modules/gameHistory";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatHistory: []
  },
  // mutations: {
  //   updateGameHistory(state, turn) {
  //     state.gameHistory.push(turn);
  //   }
  // },
  // actions: {
  //   updateHistory(context, turn) {
  //     context.commit("updateGameHistory", turn);
  //   }
  // },
  // getters: {
  //   getHistory(state) {
  //     return state.gameHistory;
  //   }
  // },
  modules: {
    gameHistory
  }
});
