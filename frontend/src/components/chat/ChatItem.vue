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

<style lang="scss" scoped>
.chat-item {
  display: flex;
  margin: 5px 0;
  align-items: center;
  padding: 5px;
  background-color: rgba(14, 14, 14, 0.8);
  border-radius: 3px;
  font-size: 14px;

  .user-name {
    color: #acacac;
  }
  .text {
    word-wrap: break-word;
    line-height: 1em;
    margin-left: 5px;
    color: #dddddd;
    width: 60%;
  }
  .date {
    color: #616161;
    font-size: 10px;
    margin-left: auto;
  }
}
</style>
