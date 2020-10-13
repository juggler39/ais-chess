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
      <span v-if="timer" class="headline font-weight-bold">{{
        minutes + ":" + seconds
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
    },
    time: {
      type: Number,
      default: 0
    },

    timer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    minutes: function() {
      return Math.floor(this.time / 60000);
    },

    seconds: function() {
      return ("00" + Math.floor((this.time / 1000) % 60).toString()).slice(-2);
    }
  }
};
</script>
