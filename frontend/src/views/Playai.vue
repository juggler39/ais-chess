<template>
  <div class="game">
    <h1 class="text-center mb-5 game-header">
      Play against the Artificial Intelligence
    </h1>
    <div class="game-bg">
      <v-container>
        <v-row>
          <Aiboard
            ref="Aiboard"
            v-bind:moves="getAIHistory"
            v-bind:newGame="newGame"
            v-bind:historyMove="historyMove"
            @newGame="newGame.start = $event"
          />
          <v-col class="col-12 col-md-3">
            <div class="right-column">
              <GameHistory
                v-bind:moves="getAIHistory"
                @historyMove="historyMove = $event"
              />
              <div class="btn-content">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="content">
                  <p>Do you want to start a new game?</p>
                  <SetUpAiGame @newGame="newGame = $event" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Aiboard from "@/components/Aiboard";
import SetUpAiGame from "@/components/dialogs/SetUpAiGame";
import GameHistory from "@/components/chat/GameHistory";
import { mapGetters } from "vuex";

export default {
  components: {
    Aiboard,
    SetUpAiGame,
    GameHistory
  },
  data() {
    return {
      newGame: {
        start: false,
        color: "",
        level: 1
      },
      historyMove: 0
    };
  },
  methods: {},
  created() {
    if (window.localStorage.getItem("history")) {
      this.$store.dispatch(
        "loadAIHistory",
        JSON.parse(window.localStorage.getItem("history"))
      );
    }
  },
  computed: mapGetters(["getAIHistory"])
};
</script>

<style lang="scss" scoped>
.game-header {
  @media (max-width: 575.98px) {
    font-size: 24px;
  }
}
.game-bg {
  background: #0f0f13e3;
}
.right-column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;

  .v-card {
    width: 100%;
  }
}
.btn-content {
  position: relative;
  width: 100%;
  background: #15151aa6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(4, 4, 7);
  color: white;
  padding: 20px;
  border-radius: 4px;

  .content {
    margin: 15px;
    background: #15151aa6;
    padding: 20px;
    text-align: center;
    box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);

    p {
      @media (max-width: 991.98px) {
        display: none;
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @media (max-width: 991.98px) {
      display: none;
    }

    &:nth-child(1) {
      transform: rotate(0deg);
    }

    &:nth-child(2) {
      transform: rotate(90deg);
    }

    &:nth-child(3) {
      transform: rotate(180deg);
    }

    &:nth-child(4) {
      transform: rotate(270deg);
    }

    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background: #3c464b;
      animation: animate 4s linear infinite;
    }
  }

  @keyframes animate {
    0% {
      transform: scaleX(0);
      transform-origin: left;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left;
    }
    50.1% {
      transform: scaleX(1);
      transform-origin: right;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
    }
  }
}
</style>
