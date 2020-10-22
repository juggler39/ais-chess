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
                    @input="changed"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    :counter="20"
                    @input="changed"
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
                    @input="changed"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="bio"
                    label="Bio"
                    :rules="bioRules"
                    @input="changed"
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
    changed() {
      this.$emit("update:username", this.username);
      this.$emit("update:email", this.email);
      this.$emit("update:password", this.password);
      this.$emit("update:bio", this.bio);
    },
    save() {
      this.dialog = false;
      localStorage.username = this.username;
      localStorage.email = this.email;
      localStorage.password = this.password;
      localStorage.bio = this.bio;
    }
  },
  mounted() {
    if (localStorage.username) {
      this.username = localStorage.username;
    }
    if (localStorage.email) {
      this.email = localStorage.email;
    }
    if (localStorage.password) {
      this.password = localStorage.password;
    }
    if (localStorage.bio) {
      this.bio = localStorage.bio;
    }
  }
};
</script>
