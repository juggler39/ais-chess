<template>
  <div class="move">
    <div
      v-for="(move, i) in moves"
      :key="i"
      class="ma-md-1 ma-sm-1 ps-md-2 ps-sm-2 grey darken-1"
    >
      <div v-if="(i + 1) % 2 === 1" class="mx-auto d-flex">
        {{ Math.round((i + 1) / 2) + "." }}
        <div class="item">{{ addFigure(move.san, move.color) }}</div>
        <div v-if="moves[i + 1] !== undefined" class="item">
          {{ addFigure(moves[i + 1].san, moves[i + 1].color) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameHistory",
  props: ["moves"],
  methods: {
    addFigure(str, color) {
      switch (str.charAt(0)) {
        case "K":
          return color === "w" ? `♚${str.slice(1)}` : `♔${str.slice(1)}`;
        case "Q":
          return color === "w" ? `♛${str.slice(1)}` : `♕${str.slice(1)}`;
        case "R":
          return color === "w" ? `♜${str.slice(1)}` : `♖${str.slice(1)}`;
        case "B":
          return color === "w" ? `♝${str.slice(1)}` : `♗${str.slice(1)}`;
        case "N":
          return color === "w" ? `♞${str.slice(1)}` : `♘${str.slice(1)}`;
        default:
          return str;
      }
    }
  }
};
</script>

<style scoped>
.move {
  width: 90%;
  margin: 0 auto;
  color: #fff;
}
.san {
  display: flex;
  width: 10vw;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: rgb(138, 132, 132);
}
.item {
  width: 90px;
  padding-left: 10px;
}
</style>
