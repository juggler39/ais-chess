<template>
  <div class="buttons">
    <v-tooltip v-for="link in menuLinks" :key="link.text" bottom>
      <template v-slot:activator="{ attrs }">
        <v-btn :to="link.route" v-bind="attrs" text class="btn-size">
          <span class="btn-content">
            <v-icon>
              {{ link.icon }}
            </v-icon>
            <span>
              {{ link.text }}
            </span>
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
      {
        icon: "mdi-desktop-mac",
        text: "Play against Computer",
        route: "/playai"
      },
      {
        icon: "mdi-account-multiple",
        text: "Play against Human",
        route: "/lobby"
      }
    ]
  })
};
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 767.98px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .v-btn {
    background-image: linear-gradient(
      45deg,
      #c2bdbd00 0%,
      #505657c0 50%,
      #1f1f2073 100%
    );
    background-position: 100% 0;
    background-size: 200% 200%;
    font-size: 14px;
    transition: 0.6s;
    padding: 1vw !important;
    width: 40%;

    .btn-content {
      display: flex;
      flex-direction: column;

      .v-icon {
        font-size: 50px;
        margin-bottom: 20px;
        background: linear-gradient(
          to right,
          #d4d4d4 20%,
          #505657c0 40%,
          #505657c0 60%,
          #d4d4d4 80%
        );
        background-size: 200% auto;
        color: #000;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 2s linear infinite;

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      }
    }

    @media (max-width: 991.98px) {
      width: 49%;
      font-size: 12px;
    }

    @media (max-width: 767.98px) {
      width: 70%;
      margin-bottom: 20px;
      font-size: 14px;
    }

    @media (max-width: 575.98px) {
      font-size: 12px;
    }

    &:hover {
      background-position: 0 0;
    }
  }

  .btn-size {
    height: 100% !important;
  }
}
</style>
