"use strict";
import Vue from "vue";
import Vuex from "vuex";
import gameHistory from "./modules/gameHistory";
import openGames from "./modules/openGames";
import finishedGames from "./modules/finishedGames";
import { getStore } from "../config/utils";

Vue.use(Vuex);

const user = getStore("userName");
const id = getStore("userID");

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    registerTab: false,
    loginUser: user,
    idUser: id,
    gameInfo: []
  },
  mutations: {
    setRegisterTab(state, value) {
      state.registerTab = value;
    },
    setGameInfo(state, game) {
      state.gameInfo = game;
    },
    setLoginUser(state, user) {
      state.loginUser = user;
    },
    removeLoginUser(state) {
      state.loginUser = null;
    },
    setLoginUserID(state, user) {
      state.idUser = user;
    },
    removeLoginUserID(state) {
      state.idUser = null;
    }
  },
  actions: {
    setRegisterTab(context, value) {
      context.commit("setRegisterTab", value);
    },
    setGameInfo(context, game) {
      context.commit("setGameInfo", game);
    }
  },
  modules: {
    gameHistory,
    openGames,
    finishedGames
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
    getGameInfo(state) {
      return state.gameInfo;
    }
  }
});
