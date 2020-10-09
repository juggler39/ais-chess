<template>
  <div class="cards">
    <v-card class="mx-auto" v-for="item in menuItems" :key="item.title">
      <v-img :src="itemImg(item.img)" height="200px"></v-img>
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
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import Json from "@/assets/cards/cards.json";

export default {
  name: "card",

  data() {
    return{
      menuItems: Json.menuItems
    }
  },
  methods: {
    itemImg: function(img) {
      return require("@/assets/cards/" + img);
    },
  },
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
}

.v-card__title {
  font-size: 1rem;
  line-height: 1rem;
} 
</style>