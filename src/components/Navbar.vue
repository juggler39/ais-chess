<template>
  <nav>
    <v-app-bar class="text-uppercase" app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-sm-and-down">
        ais-chess
      </v-toolbar-title>

      <div class="menubuttons" v-for="link in menuLinks" :key="link.text">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :to="link.route" v-bind="attrs" v-on="on" text class="ml-1">
              <v-icon left>{{ link.icon }}</v-icon>
              <span class="hidden-sm-and-down">
                {{ link.text }}
              </span>
            </v-btn>
          </template>
          <span>{{ link.text }}</span>
        </v-tooltip>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn text>
        <v-icon left>mdi-logout</v-icon>
        <span class="hidden-sm-and-down">
          logout
        </span>
      </v-btn>
      <Login />
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="link in drawerLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon> {{ link.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense subheader>
        <v-subheader>User Controls</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="link in drawerLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon> {{ link.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ link.text }} </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "./Login";

export default {
  components: {
    Login
  },
  data: () => ({
    menuLinks: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-store", text: "Lobby", route: "/lobby" },
      { icon: "mdi-mouse", text: "Play AI", route: "/playai" },
      { icon: "mdi-face", text: "Play Human", route: "/game" }
    ],
    drawer: false,
    drawerLinks: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-account", text: "Account", route: "/account" },
      { icon: "mdi-email", text: "Contact", route: "/contact" }
    ]
  })
};
</script>
