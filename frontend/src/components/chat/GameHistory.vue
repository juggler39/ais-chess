<template>
  <v-card class="mx-auto">
    <h2 class="text-center">Moves</h2>
    <div class="history" ref="history">
      <ul>
        <li
          v-for="(move, index) in moves"
          :key="index"
          @click="historyMove(index + 1)"
          :id="'ply' + (index + 1)"
        >
          <label v-if="index % 2 === 0">{{ index / 2 + 1 }}.</label>
          {{ getFigureImage(move.color + move.piece) + " " + move.san }}
        </li>
      </ul>
    </div>
    <div class="history-buttons">
      <v-btn @click="historyMove(0)" dark small mt-2>
        <v-icon medium dark>mdi-chevron-double-left</v-icon>
      </v-btn>
      <v-btn @click="historyMove(currentPly - 1)" dark small mt-2>
        <v-icon medium dark>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn @click="historyMove(currentPly + 1)" dark small mt-2>
        <v-icon medium dark>mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn @click="historyMove(moves.length)" dark small mt-2>
        <v-icon medium dark>mdi-chevron-double-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "gameHistory",
  data() {
    return {
      currentPly: 0
    };
  },
  props: ["moves"],
  watch: {
    moves: function() {
      if (typeof this.moves !== "undefined") {
        this.currentPly = this.moves.length;
        this.clearActivePly(this.currentPly);
      } else {
        this.currentPly = 0;
      }
    }
  },
  methods: {
    getFigureImage(figure) {
      const figures = {
        bp: "",
        br: "♖",
        bb: "♗",
        bn: "♘",
        bk: "♔",
        bq: "♕",
        wp: "",
        wr: "♜",
        wb: "♝",
        wn: "♞",
        wk: "♚",
        wq: "♛"
      };
      return figures[figure];
    },
    historyMove(ply) {
      const moves = this.moves.length || 0;
      if (ply < 0) ply = 0;
      if (ply > moves) ply = moves;
      this.currentPly = ply;
      this.$emit("historyMove", this.currentPly);
      this.clearActivePly(moves + 1);
      if (this.currentPly > 0) {
        document
          .getElementById("ply" + this.currentPly)
          .classList.add("active");
      }
    },
    clearActivePly(ply) {
      for (let i = 1; i < ply; i++) {
        document.getElementById("ply" + i).classList.remove("active");
      }
    },
    scrollToEnd() {
      const history = this.$refs.history;
      history.scrollTop = history.scrollHeight;
    }
  },
  updated() {
    this.scrollToEnd();
  },
  mounted() {

    const moves = this.moves.length || 0;
    this.historyMove(moves);
    this.scrollToEnd();
  }
};
</script>

<style lang="scss" scoped>
.active {
  background-color: #8aa0ab;
}

.history {
  width: 100%;
  height: 200px;
  overflow-y: scroll;
}
.history-buttons {
  display: flex;

  .v-btn {
    width: 25%;
  }
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #bcc9d2;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #bcc9d2;
}
ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}
li {
  list-style-type: none;
}
</style>
