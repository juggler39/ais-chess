<template>
  <v-dialog persistent v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
       <!-- <v-btn text v-bind="attrs" v-on="on">
        <span class="hidden-sm-and-down">
          register
        </span>
        <v-icon right>mdi-lead-pencil</v-icon>
      </v-btn> -->
       <v-btn text v-bind="attrs" v-on="on" class="btn-for-after">
        <span class="hidden-sm-and-down">
          login
        </span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <ModalTabs />
            <v-btn icon large @click="dialog = false" class="btn-close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
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
              <v-btn color="primary" @click.prevent="loginWithLogin"
                >Login</v-btn
              >
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
import router from '../router/index';
import axios from "axios";
import ModalTabs from "./ModalTabs";

export default {
  name: 'login_signup_social',
  components: { ModalTabs },
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
                            window.localStorage.setItem("userID", response.data.user.id);
                            this.$store.commit("setLoginUser", response.data.user.name);
                            this.$store.commit("setLoginUserID", response.data.user.id);
                            router.push('/account', () => {});
                          }, (error) => {
                            console.log(error);
                          });
          router.push('/', () => {})
          this.dialog = false;
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
                              window.localStorage.setItem("userID", response.data.user.id);
                              this.$store.commit("setLoginUser", response.data.user.name);
                              this.$store.commit("setLoginUserID", response.data.user.id);
                              router.push('/account', () => {});
                              this.dialog = false;
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

<style lang="scss" scoped>
.btn-for-after {
  position: relative;
  margin-right: 5px;
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    background-color: #303030;
    top: 0;
    right: -5px;
  }
}
.btn-close {
  position: absolute;
  right: 0;
  top: 0;
  &::before {
    border-radius: 5px;
  }
}
</style>