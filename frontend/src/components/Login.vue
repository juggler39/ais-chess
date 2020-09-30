<!-- eslint-disable -->
<template>
  <v-dialog persistent v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon left>mdi-login</v-icon>
        <span class="hidden-sm-and-down">
          login
        </span>
      </v-btn>
    </template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>

              <v-btn icon large @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field id="Login"
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                ></v-text-field>
                <v-text-field id="Password"
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
                  <img alt="Google" src="https://img.comss.net/fit-in/200x200/filters:fill(FFFFFF)/logo/google-logo.png" width="18" height="18">
                  Google
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="loginWithLogin">Login</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import router from '../router/index'
import axios from "axios"
export default {
  name: 'login_signup_social',
  methods: {
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(async GoogleUser => {
          // on success send ID to backend
          await axios.post('/api/users/google', {
                        ID: GoogleUser.getAuthResponse().id_token
                      }).then(async (response) => {
                            axios.defaults.headers.common["Authorization"] = `Token ${response.data.user.token}`;
                            window.localStorage.setItem("userLog", response.data.user.token);
                            window.localStorage.setItem("userName", response.data.user.name);
                            this.$store.commit("setLoginUser", response.data.user.name);
                            router.push('/account', () => {});
                          }, (error) => {
                            console.log(error);
                          });
          router.push('/', () => {})
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    loginWithLogin() {
      let userObj = {
        user: {
          login: document.getElementById("Login").value,
          password: document.getElementById("Password").value
        }
      }
      axios.post('/api/users/login', userObj).then(async (response) => {
                            if (response.data.user) {
                              axios.defaults.headers.common["Authorization"] = `Token ${response.data.user.token}`;
                              window.localStorage.setItem("userLog", response.data.user.token);
                              window.localStorage.setItem("userName", response.data.user.name);
                              this.$store.commit("setLoginUser", response.data.user.name);
                              router.push('/account', () => {});
                            }

                            //here if Login info is incorrect

                          }, (error) => {
                            console.log(error);
                          });
    }
  },
   data() {
    return {
      dialog: false
    };
  }
}
</script>
