import Vue from "vue";
import Vuex from "vuex";
import { setStore, getStore, removeItem } from "../config/utils";

Vue.use(Vuex);

const user = getStore("user");

export default new Vuex.Store({
  state: {
    gameHistory: [1, 2, 3, 4],
    chatHistory: [],
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
  modules: {},
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    }
  }
});
