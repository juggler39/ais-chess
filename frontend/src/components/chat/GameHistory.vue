<template>
  <v-card class="mx-auto">
    <h2 class="text-center">Moves</h2>
    <div class="history">
      <ul>
        <li
          v-for="(move, index) in moves"
          v-bind:key="index"
          @click="historyMove(index)"
        >
          <label v-if="index % 2 === 0">{{ index / 2 + 1 }}.</label>
          {{ getFigureImage(move.color + move.piece) + " " + move.san }}
        </li>
      </ul>
    </div>
    <v-btn @click="historyMove(0)" dark small mt-2>s</v-btn>
    <v-btn @click="historyMove(currentPly - 1)" dark small mt-2>b</v-btn>
    <v-btn @click="historyMove(currentPly + 1)" dark small mt-2>f</v-btn>
    <v-btn @click="historyMove(moves.length)" dark small mt-2>e</v-btn>
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
      this.currentPly = this.moves.length;
      this.historyMove(this.currentPly);
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
      if (ply < 0) ply = 0;
      if (ply > this.moves.length) ply = this.moves.length;
      this.currentPly = ply;
      this.$emit("historyMove", this.currentPly);
    }
  },
  mounted() {
    if (typeof this.moves !== "undefined") {
      this.historyMove(this.moves.length);
    } else {
      this.historyMove(0);
    }
  }
};
</script>

<style scoped>
.history {
  width: 100%;
  height: 200px;
  overflow-y: scroll;
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
