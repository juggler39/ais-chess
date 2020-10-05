import Vue from "vue";
import Vuex from "vuex";
import gameHistory from "./modules/gameHistory";
import openGames from "./modules/openGames";
// eslint-disable-next-line
import {getStore} from "../config/utils";

Vue.use(Vuex);

const user = getStore("userName");

export default new Vuex.Store({
  state: {
    time: 600000,
    timeWhite: 0,
    timeBlack: 0,
    playAiColor: "",
    AiStart: false,
    loginUser: user
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    removeLoginUser(state) {
      state.loginUser = null;
    }
  },
  actions: {},
  modules: {
    gameHistory,
    openGames
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    }
  }
});
