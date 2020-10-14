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
      <v-btn color="secondary" @click.prevent="loginWithLogin"
        >Login</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "LoginField",

}
</script>