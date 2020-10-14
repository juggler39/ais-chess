<template>
  <v-toolbar>
    <v-tabs v-model="tab" color="white">
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab v-for="tab in tabs" :key="tab.name">
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: "ModalTabs",
  data: () => ({
    tabs: [
      { name: "Login" },
      { name: "Register" }
    ]
  })
};
</script>

<style lang="scss" scoped>
.tabs {
  .v-tab--active {
    color: #ffffff;
  }
}
</style>
