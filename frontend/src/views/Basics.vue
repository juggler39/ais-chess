<template>
  <div class="basics">
    <h1 class="subtitle ml-2">
      How to Play Chess | Rules
    </h1>
    <BasicMenu />
  </div>
</template>

<script>
import BasicMenu from "@/components/BasicMenu";

export default {
  name: "Basics",
  components: { BasicMenu },
  data: () => ({
    items: [
      {
        item: "Set up the Chess Board",
        color: "deep-purple lighten-5"
      },
      {
        item: "Learn to move the Pieces",
        color: "deep-purple lighten-4"
      },
      {
        item: "Discover the Special Rules",
        color: "deep-purple lighten-3"
      },
      {
        item: "Learn who Makes the First Move",
        color: "deep-purple lighten-2"
      },
      {
        item: "Check out the rules on How to Win",
        color: "deep-purple lighten-1"
      },
      {
        item: "Study the Basic Strategies",
        color: "deep-purple darken-1"
      },
      {
        item: "Practice Playing Lots of Games",
        color: "deep-purple darken-2"
      }
    ]
  })
};
</script>
<style lang="scss" scoped>
.basics {
  .basics-bg {
    background: url("../assets/cards/img2.jpg") 50%;
    background-size: cover;
    padding: 30px 10px;
    position: relative;

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
    }

    .subtitle {
      position: relative;
      z-index: 2;
    }
  }

  .v-timeline {
    position: relative;
    z-index: 2;

    .basic-link {
      color: #ffffff;
      transition: 0.3s ease-in;

      &:hover {
        color: #9575cd;
      }
    }
  }
}
</style>
