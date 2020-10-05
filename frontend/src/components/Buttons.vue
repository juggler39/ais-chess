<template>
  <div class="buttons">
    <v-tooltip v-for="link in menuLinks" :key="link.text" bottom>
      <template v-slot:activator="{ attrs }">
        <v-btn :to="link.route" v-bind="attrs" text class="ml-1 btn-size">
          <span>
            {{ link.text }}
          </span>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  data: () => ({
    menuLinks: [
      { icon: "mdi-mouse", text: "Play AI", route: "/playai" },
      { icon: "mdi-face", text: "Play Human", route: "/game" }
    ]
  })
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-evenly;

  .v-btn {
    background-image: linear-gradient(45deg, #c2bdbd00 0%, #505657c0 50%, #1f1f2073 100%);
    background-position: 100% 0;
    background-size: 200% 200%;
    font-size: 16px;
    transition: 0.6s;
    padding: 1vw !important;
    width: 15vw;

    &:hover {
      background-position: 0 0;
    }
  }

  .btn-size {
    height: 100% !important;
  }
}
</style>
