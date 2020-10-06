<template>
  <div class="move">
    <span>{{ `${id}.` }}</span>
    <span class="san">{{ addFigure(move[0][0].san, move[0][0].color) }}</span>
    <span class="san">{{ addFigure(move[0][1].san, move[0][1].color) }}</span>
  </div>
</template>

<script>
export default {
  name: "gameHistory",
  props: ["move", "id"],
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
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5px;
  background-color: rgb(90, 90, 90);
  color: #fff;
}
.san {
  width: 20%;
  margin-left: 10px;
}
</style>
