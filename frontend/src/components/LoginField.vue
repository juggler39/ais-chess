<template>
  <div class="card">
    <v-card-text>
      <v-form>
        <v-text-field
          id="Login"
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
        ></v-text-field>
        <v-text-field
          id="Password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click.prevent="loginWithGoogle">
        <img
          alt="Google"
          src="https://img.comss.net/fit-in/200x200/filters:fill(FFFFFF)/logo/google-logo.png"
          width="18"
          height="18"
        />
        Google
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click.prevent="loginWithLogin">Login</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";

export default {
  name: "LoginField",
  methods: {
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then(async GoogleUser => {
          // on success send ID to backend
          await axios
            .post("/api/users/google", {
              ID: GoogleUser.getAuthResponse().id_token
            })
            .then(
              async response => {
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Token ${response.data.user.token}`;
                window.localStorage.setItem(
                  "userLog",
                  response.data.user.token
                );
                window.localStorage.setItem(
                  "userName",
                  response.data.user.name
                );
                window.localStorage.setItem("userID", response.data.user.id);
                this.$store.commit("setLoginUser", response.data.user.name);
                this.$store.commit("setLoginUserID", response.data.user.id);
                router.push("/account", () => {});
              },
              error => {
                console.log(error);
              }
            );
          router.push("/", () => {});
          this.dialog = false;
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    loginWithLogin() {
      let userObj = {
        user: {
          login: document.getElementById("Login").value,
          password: document.getElementById("Password").value
        }
      };
      axios.post("/api/users/login", userObj).then(
        async response => {
          if (response.data.user) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Token ${response.data.user.token}`;
            window.localStorage.setItem("userLog", response.data.user.token);
            window.localStorage.setItem("userName", response.data.user.name);
            window.localStorage.setItem("userID", response.data.user.id);
            this.$store.commit("setLoginUser", response.data.user.name);
            this.$store.commit("setLoginUserID", response.data.user.id);
            router.push("/account", () => {});
            this.dialog = false;
          }
          //here if Login info is incorrect
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>
