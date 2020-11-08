<template>
  <div class="basics-bg">
    <p class="title-content ml-4">
      It's never too late to learn how to play chess - the most popular game in
      the world! Learning the rules of chess is easy:
    </p>
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="item in items"
        :key="item.item"
        :color="item.color"
        small
      >
        <div>
          <a :href="item.id" class="basic-link">{{ item.item }}</a>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: "BasicMenu",
  data: () => ({
    items: [
      {
        id: "/basics#1",
        item: "Set up the Chess Board",
        color: "light-green lighten-5"
      },
      {
        id: "/basics#2",
        item: "Learn to move the Pieces",
        color: "light-green lighten-4"
      },
      {
        id: "/basics#4",
        item: "Learn to move the King",
        color: "light-green lighten-3"
      },
      {
        id: "/basics#4",
        item: "Learn to move the Queen",
        color: "light-green lighten-2"
      },
      {
        id: "/basics#5",
        item: "Learn to move the Rook",
        color: "light-green lighten-1"
      },
      {
        id: "/basics#6",
        item: "Learn to move the Knight",
        color: "light-green"
      },
      {
        id: "/basics#7",
        item: "Learn to move the Pawn",
        color: "light-green darken-1"
      },
      {
        id: "/basics#8",
        item: "How to promote a Pawn",
        color: "light-green darken-2"
      },
      {
        id: "/basics#9",
        item: "How to do 'en passant'",
        color: "light-green darken-3"
      },
      {
        id: "/basics#10",
        item: "How to Castle",
        color: "light-green darken-4"
      }
    ]
  })
};
</script>
<style lang="scss" scoped>
.basics-bg {
  background: url("../assets/cards/img2.jpg") 50%;
  background-size: cover;
  padding: 50px 10px;
  position: relative;
  margin: 20px 0 50px;

  @media (max-width: 575.98px) {
    padding: 10px;
  }

  .title-content {
    font-weight: bold;
    position: relative;
    z-index: 2;
    font-size: 18px;

    @media (max-width: 575.98px) {
      font-size: 14px;
      font-weight: normal;
    }
  }

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
    text-decoration: none;

    &:hover {
      color: #7cb342;
    }
  }

  .v-timeline-item {
    @media (max-width: 575.98px) {
      padding-bottom: 15px;
    }
  }
}
</style>
