<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="error" dark v-bind="attrs" v-on="on">
          Resign
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="error">
          <v-toolbar-title>Resign</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-5">Are you sure?</v-card-text>
        <v-card-actions>
          <v-btn color="error" dark @click="dialog = false">NO</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="submit">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    submit() {
      this.$emit("resign", true);
      this.dialog = false;
    }
  }
};
</script>
