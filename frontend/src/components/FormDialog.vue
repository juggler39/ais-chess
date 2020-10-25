<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
          Edit Profile
          <v-icon class="ml-10">mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Your Information</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="UserName"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    :counter="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="New Password"
                    v-model="password"
                    :counter="10"
                    autocomplete="on"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="bio"
                    label="Bio"
                    :rules="bioRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="white darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    valid: true,
    props: ["username", "email", "password", "bio"],
    username: "",
    bio: "",
    nameRules: [v => v.length <= 20 || "Name must be less than 20 characters"],
    bioRules: [v => v.length <= 360 || "Name must be less than 360 characters"],
    email: "",
    emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
    password: "",
    rules: [v => v.length <= 10 || "Password must be less than 10 characters"],
    show: false
  }),
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        let userObj = {
          name: this.username,
          email: this.email,
          password: this.password,
          bio: this.bio
        };
        axios.post("/api/users/update", { user: userObj }).then(
          response => {
            if (response.data.user) {
              window.localStorage.setItem("userName", response.data.user.name);
              this.$store.commit("setLoginUser", response.data.user.name);
              this.dialog = false;
            } else {
              console.log(response.data.errors);
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    updateInfo() {
      axios.get("/api/users/info").then(response => {
        const {
          data: { user }
        } = response;
        this.username = user.name;
        this.email = user.email;
        this.bio = user.bio;
      });
    }
  },
  mounted() {
    this.updateInfo();
  }
};
</script>
