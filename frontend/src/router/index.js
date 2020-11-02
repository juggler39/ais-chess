"use strict";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import Game from "../views/Game.vue";
import Lobby from "../views/Lobby.vue";
import Playai from "../views/Playai.vue";
import NotFound from "../views/NotFound.vue";
import Contacts from "../views/Contacts.vue";
import axios from "axios";
import News from "../views/News.vue";
import Article from "../components/Article.vue";

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
    path: "/game/:id",
    name: "Game",
    component: Game
  },
  {
    path: "/game",
    name: "HumanGame",
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
  },
  {
    path: "/about_us",
    name: "Contacts",
    component: Contacts
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/news/:title",
    name: "Article",
    component: Article
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /* eslint-disable */
  // redirect to home page if not logged in and trying to access a restricted page
  const publicPages = ["/lobby", "/playai", "/", "/news", "/news/:title", "/about_us"];
  const authRequired = !publicPages.includes(to.path);

  async function verify() {
  if (authRequired) {
    await axios.get("/api/users/secret", {}).then((response) => {
      if (response.data.user === "Access is allowed") {
        return next();
      }
      else return next("/");
      }, error => {
        return next("/");
      });
    }
  else next();
  }
  if (routes.find(elem => elem.path === to.path) !== undefined || /\/game/.test(to.path)) verify().catch(() => {console.error; res.json({ err: "error in GAuth" });});
  else {
    next();
  }
});

export default router;
