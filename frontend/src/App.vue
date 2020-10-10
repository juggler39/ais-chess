<template>
  <v-app>
    <Navbar />
    <div class="shimmery-background">
      <div class="background-image"></div>
      <div class="content">
        <v-main class="container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-main>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Navbar, Footer },
  sockets: {
    connect() {
      console.log("connected to server");
    },
    newGameInfo(games) {
      this.$store.dispatch("updateGamesList", games);
      this.$store.getters.getGames.forEach(game => {
        if (game.players.player1Name == this.$store.state.loginUser) {
          console.log("connected " + this.$store.state.loginUser);
          this.$socket.client.emit("joinRoom", game.id);
        }
      });
    },
    startGame(game) {
      this.$router.push({ name: "Game", params: { id: game[0].id } });
    }
  },
  mounted() {
    this.$socket.client.emit("loadGames");
  }
};
</script>

<style lang="scss" scoped>
.background-image {
  background: url("assets/foreground.png") 5% 5%,
    url("assets/midground.png") 50% 50%, url("assets/background.png") 90% 110%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  transition: left 300s linear;
}

.shimmery-background {
  flex: 1 0 auto;
  &:target .background-image {
    left: -5000px;
  }

  &:hover .background-image {
    left: -9999px;
  }

  .content {
    opacity: 0.99;
  }
}
.fade-leave-to {
  animation: fade 0.3s;
}
.fade-enter-active {
  animation: fade 0.3s;
  animation-direction: reverse;
}
.v-application {
  background-color: #000000 !important;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.container {
  width: 1140px;
  margin: 0 auto;
  padding: 0;
  height: 100%;

  @media (max-width: 1170px) {
    width: 960px;
  }

  @media (max-width: 991.98px) {
    width: 720px;
  }

  @media (max-width: 767.98px) {
    width: 540px;
  }

  @media (max-width: 575.98px) {
    width: 100%;
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
