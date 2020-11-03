<template>
  <div class="basics">
    <h1 class="subtitle ml-2">
      How to Play Chess | Rules
    </h1>
    <BasicMenu />
    <Rules />
  </div>
</template>

<script>
import BasicMenu from "@/components/BasicMenu";
import Rules from "@/components/Rules";

export default {
  name: "Basics",
  components: { BasicMenu, Rules }
};
</script>
<style lang="scss" scoped>
.basics {
  .btn {
    bottom: 20px;
  }
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
