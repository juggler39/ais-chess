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
                    label="UserName"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    :rules="emailRules"
                    :counter="20"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="New Password"
                    name="password"
                    type="password"
                    :rules="passwordRules"
                    :counter="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="items"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
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
          <v-btn color="white darken-1" text @click="dialog = false">
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
    items: [
      "Skiing",
      "Ice hockey",
      "Soccer",
      "Basketball",
      "Hockey",
      "Reading",
      "Writing",
      "Coding",
      "Base"
    ],
    valid: true,
    username: "",
    nameRules: [v => v.length <= 20 || "Name must be less than 20 characters"],
    email: "",
    emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
    password: "",
    passwordRules: [
      v => v.length <= 10 || "Password must be less than 10 characters"
    ]
  })
};
</script>
