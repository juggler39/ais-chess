<template>
  <div class="news-blog">
    <h1 class="subtitle">
      Latest news in the world of chess
    </h1>
    <Card />
  </div>
</template>

<script>
import Card from "@/components/Card";
// @ is an alias to /src

export default {
  name: "News",
  components: { Card }
};
</script>

<style lang="scss" scoped>

</style>
