<template>
  <div class="chat-item">
    <div class="user-name">{{ data.userName + ":" }}</div>
    <div class="text">{{ data.message }}</div>
    <span class="date">{{ data.time }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  props: ["data"]
};
</script>

<style scoped>
.chat-item {
  display: flex;
  margin: 3px;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgb(105, 105, 105);
  padding: 3px;
  width: 98%;
  color: azure;
  font-size: 14px;
}
.user-name {
  color: bisque;
  font-weight: bold;
  padding-right: 5px;
}
.text {
  margin: 0;
  display: inline-block;
  word-wrap: break-word;
  width: 60%;
}
.date {
  color: goldenrod;
  font-size: 12px;
  text-align: left;
  width: 60px;
  overflow-wrap: anywhere;
}
</style>
