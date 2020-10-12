<template>
 <div class="cards">
   <v-card class="mx-auto" v-for="item in menuItems" v-bind:key="item.title" v-bind:count="maxCount">
    <v-img :src="getImg(item.img)" height="200px"></v-img>
      <v-card-title>
        {{ item.title }}
      </v-card-title>
      <v-card-actions class="action">
        <v-btn color="grey" text>More</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="item.show = !item.show">
          <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="item.show">
          <v-divider></v-divider>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
          <router-link :to="{ name: 'Article', params: { title: item.title, img: getImg(item.img), content: item.content }}" class="article-link">
            Read more
            <v-icon dark class="arrow-right" x-small>mdi-arrow-right</v-icon>
          </router-link>
        </div>
      </v-expand-transition> 
    </v-card>
  </div>
</template>

<script>
import Json from "@/assets/cards/cards.json";

export default {
  name: "card",
  props: ["maxCount"],
  data() {
    return{
      menuItems: Json.menuItems.slice(0, this.maxCount)
    }
  },
  methods: {
    getImg: function(img) {
      return require("@/assets/cards/" + img);
    }
  },
  computed: {
    params() {
      return this.$route.params;
    }
  }
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
  .v-card {
    flex: 0 30%;
    margin-bottom: 5%;
    max-width: 344px;
  }
  .v-card__title {
    font-size: 1rem;
    line-height: 1rem;
  } 
  .v-card__text {
    padding: 1rem;
    height: 100px;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(180deg, transparent, #1E1E1E 50%);
    }
  }

  .article-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 12px;
    transition: 0.3s ease-in;
    float: right;
    padding: 5px 20px;

    &:hover {
      opacity: 0.7;
    }

    &:hover .arrow-right {
    transform: translate(5px, 0);
  }
  }
}
</style>