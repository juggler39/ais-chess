"use strict";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import Game from "../views/Game.vue";
import Lobby from "../views/Lobby.vue";
import Playai from "../views/Playai.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby
  },
  {
    path: "/playai",
    name: "Playai",
    component: Playai
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
