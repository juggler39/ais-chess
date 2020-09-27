import Vue from "vue";
import Vuex from "vuex";
import gameHistory from "./modules/gameHistory";
import { setStore, getStore, removeItem } from "../config/utils";

Vue.use(Vuex);

const user = getStore("user");

export default new Vuex.Store({
  state: {

    gameHistory: [],
    chatHistory: [],
    playAiColor: "",
    AiStart: false,
    loginUser: user
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      setStore("user", user);
    },
    removeLoginUser(state) {
      state.loginUser = "";
      removeItem("user");
    }
  },
  actions: {},
  modules: {
    gameHistory
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    }
  }
});
