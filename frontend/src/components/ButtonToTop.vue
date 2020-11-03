<template>
  <div class="button-to-top">
    <v-btn
      class="elevation-21 btn"
      small
      dark
      fab
      button
      right
      color="blue-grey darken-3"
      fixed
      @click="top"
    >
      <v-icon>
        mdi-arrow-up
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonToTop",
  methods: {
    top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.button-to-top {
  .btn {
    bottom: 20px;
    opacity: 0.5;
  }
}
</style>
