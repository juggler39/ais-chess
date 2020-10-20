<template>
  <div class="tabs">
    <v-tabs v-model="tab" color="white">
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab" :ref="item.ref">
        <v-card flat>
          <v-card-text>
            <component v-bind:is="item.content"></component>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import LoginField from "./LoginField";
import RegisterField from "./RegisterField";

export default {
  name: "ModalTabs",
  components: { LoginField, RegisterField },

  data: () => ({
    tab: null,
    items: [
      {
        tab: "Login",
        ref: "log",
        content: "LoginField",
        show: "RegisterField",
        txt: "Do not have an account? ",
        link: "Register now"
      },
      {
        tab: "Register",
        content: "RegisterField",
        txt: "Already registered, ",
        link: "sign in?"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.tabs {
  .v-tab--active {
    color: #ffffff;
  }

  .tabs-link {
    color: grey;
    transition: 0.3s ease-in;
    text-decoration: none;

    &:hover {
      color: #ffffff;
    }
  }
}
</style>
