import Vue from "vue";
import Vuex from "vuex";
import gameHistory from "./modules/gameHistory";
import { getStore} from "../config/utils";

Vue.use(Vuex);

const user = getStore("user");

export default new Vuex.Store({
  state: {
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
    gameHistory
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    }
  }
});
