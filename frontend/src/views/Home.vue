<template>
  <div class="home">
    <div class="main-banner">
      <img class="home--main_image" slot="image" :src="require('@/assets/chess-img.gif')" />
    <div class="home--title">
      <h1 class="main-title">Experience Virtual World of Chess</h1>
      <p class="subtitle">
        We provide you with an amazing chess application, giving you an opportunity to explore the world of online chess.
      </p>
      <Buttons />
    </div>
    </div>
    <div class="description blink">
      <p>
        Nowadays chess remain a very popular sport. Everybody can go online and play a game of chess with somebody or participate in the tournament.
      </p>
      <p>
        Any time of the day you can find thousands of players of different levels who want to play with you on our chess portal.
      </p>
      <p>
        There are major tournaments and championships and winners get big money prizes.
      </p>
    </div>
    <router-link :to="{ name: 'News' }">
      Latest news in the world of chess
    </router-link>
  </div>
</template>

<script>
import Buttons from "@/components/Buttons";
// @ is an alias to /src

export default {
  name: "Home",
  components: { Buttons }
};
</script>

<style lang="scss" scoped>
.main-banner {
  display: flex;
  justify-content: space-around;

  .home--main_image {
    padding: 5%;
    opacity: 0.7;
  }

  .home--title {
    padding: 5%;

    @keyframes title {
      10% {
        transform: scale(1, 1) rotate(80deg);
      }
      20% {
        transform: scale(0, 0) rotate(160deg);
      }
      100% {
        transform: scale(0, 0) rotate(0deg);
      }
    }

    .main-title {
      position: relative;
      display: inline-block;
      color: #fff;
      text-shadow: 0 0 10px #3d7a97;
      letter-spacing: 1px;
    }

    .main-title:after, .main-title:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100px;
      height: 100px;
      background-image: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 30%), linear-gradient(45deg, rgba(0, 0, 0, 0) 49%, rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0) 51%),
      linear-gradient(135deg, rgba(0, 0, 0, 0) 49%, rgba(255, 255, 255, 0.4) 50%, rgba(0, 0, 0, 0) 51%);
      animation: title 7s linear infinite;
      transform: scale(0, 0) rotate(0deg);
    }
    .main-title:before {
      top: -100%;
      right: 0;
      left: auto;
      animation-delay: 3s;
    }

    .subtitle {
      font-size: 1rem;
      line-height: 1.25rem;
      padding-top: 20px;
      font-weight: 300;
      letter-spacing: 1px;
    }
  }
}

.description {
  margin: 3em 5em;
  background-color: #333;
  opacity: 0.5;
  color: #ccc;
  padding: 3em;
  border: 2px solid #666;

  p {
    margin: 0.2em 0;
    color: #fff;
  }
}

.blink {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1.0, 2.0, 2.0, 1.0);
  animation-duration: 3s;
}
 
@keyframes blinker {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 0.4;
  }
}
</style>
