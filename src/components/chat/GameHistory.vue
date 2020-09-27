<template>
  <div v-if="move.color === 'w'" class="white">
    <span>{{ "White moves " + move.orig + " " + move.dest }}</span>
  </div>
  <div v-else class="black">
    <span>{{ "Black moves " + move.orig + " " + move.dest }}</span>
  </div>
</template>

<script>
export default {
  name: "gameHistory",
  props: ["move"]
};
</script>

<style scoped>
.white {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5px;
  background-color: aliceblue;
  color: #000;
}
.black {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5px;
  background-color: #000;
  color: aliceblue;
}
</style>
