import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
import GoogleAuth from "./config/google.js";
import VueResource from "vue-resource";

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.use(VueResource);

const gauthOption = {
  // eslint-disable-next-line
  clientId: "745478166073-6pqqiojeous9m3s3moi88krc0obh6u8d.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};

const socket = io("http://localhost:8000");

Vue.use(VueSocketIOExt, socket);
Vue.use(GoogleAuth, gauthOption);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
