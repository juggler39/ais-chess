<template>
  <div class="card">
    <v-form ref="form" lazy-validation>
      <v-text-field
        id="username"
        v-model="username"
        :rules="nameRules"
        :counter="20"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        id="email"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        id="password"
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="input"
        label="Password"
        hint="At least 4 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>
      <v-layout>
        <v-btn color="secondary" @click="submit">
          submit
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import router from '../router/index';
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    username: "",
    nameRules: [
      v => !!v || "First Name is required",
      v => v.length <= 20 || "Name must be less than 20 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    show: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 4 || "Min 4 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        console.log('1');
>>>>>>> feat: registration again
=======
>>>>>>> feat: registration again (remove console.log)
        let userObj = {
          user: {
            login: this.username,
            password: this.password,
            email: this.email
          }
        }
<<<<<<< HEAD
<<<<<<< HEAD
        axios.post('/api/users/register', userObj).then((response) => {
                              if (response.data.user) {
=======
        console.log(userObj);
        axios.post('/api/users/register', userObj).then((response) => {
                              if (response.data.user) {
                                console.log('response');
>>>>>>> feat: registration again
=======
        axios.post('/api/users/register', userObj).then((response) => {
                              if (response.data.user) {
>>>>>>> feat: registration again (remove console.log)
                                axios.defaults.headers.common["Authorization"] = `Token ${response.data.user.token}`;
                                window.localStorage.setItem("userLog", response.data.user.token);
                                window.localStorage.setItem("userName", response.data.user.name);
                                window.localStorage.setItem("userID", response.data.user.id);
                                this.$store.commit("setLoginUser", response.data.user.name);
                                this.$store.commit("setLoginUserID", response.data.user.id);
                                router.push('/account', () => {});
                                this.dialog = false;
                              }
                              else {//here if Login info is incorrect
                                console.log(response.data.errors);
<<<<<<< HEAD
<<<<<<< HEAD
=======
                                console.log('Error');
>>>>>>> feat: registration again
=======
>>>>>>> feat: registration again (remove console.log)
                              }
                            }, (error) => {
                              console.log(error);
                            });
        }
    }
  }
};
</script>
