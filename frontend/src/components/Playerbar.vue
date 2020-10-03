<template>
  <v-card class="my-4">
    <v-app-bar>
      <v-avatar tile color="indigo">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <v-card-text class="headline font-weight-bold ml-4">
        {{ username }}
      </v-card-text>
      <v-spacer></v-spacer>
      <span class="headline font-weight-bold">{{
        color === "white"
          ? whiteMinutes + ":" + whiteSeconds
          : blackMinutes + ":" + blackSeconds
      }}</span>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: "test"
    },
    color: {
      type: String,
      default: "white"
    }
  },
  computed: {
    whiteMinutes: function() {
      return Math.floor(this.$store.state.timeWhite / 600);
    },
    blackMinutes: function() {
      return Math.floor(this.$store.state.timeBlack / 600);
    },
    whiteSeconds: function() {
      return (
        "00" + Math.floor(this.$store.state.timeWhite % 600).toString()
      ).slice(-3, -1);
    },
    blackSeconds: function() {
      return (
        "00" + Math.floor(this.$store.state.timeBlack % 600).toString()
      ).slice(-3, -1);
    }
  }
};
</script>
