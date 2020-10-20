<template>
  <div class="tabs">
    <v-tabs v-model="model" color="white">
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card-text>
            <component v-bind:is="item.content"></component>
          </v-card-text>
          <p class="forgot-password text-center pb-10">
            {{ item.txt }}
            <v-card-actions>
              <v-btn class="tabs-link" @click="changeTab()">
                {{ item.link }}
              </v-btn>
            </v-card-actions>
          </p>
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
    i: 0,
    model: "Register",
    items: [
      {
        tab: "Login",
        content: "LoginField",
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
  }),
  methods: {
    changeTab() {
      this.i = this.i + 1;
      this.model = `tab-${this.i + 1}`;
      console.log(this.model);
    }
  }
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
