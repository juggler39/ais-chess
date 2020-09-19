<template>
  <v-app>
    <Navbar />
    <v-main class="ma-5">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  })
};
</script>

<style scoped>
.fade-leave-to {
  animation: fade 0.3s;
}
.fade-enter-active {
  animation: fade 0.3s;
  animation-direction: reverse;
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
