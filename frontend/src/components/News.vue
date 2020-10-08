<template>
 <div class="cards">
    <v-card class="mx-auto" max-width="344"  v-for="item in menuItems" :key="item.text">
    <v-img :src="item.img" height="200px"></v-img>
    <v-card-title>
      {{ item.title }}
    </v-card-title>
    <v-card-actions class="action">
      <v-btn color="grey" text>More</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="item.show =!item.show">
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
export default {
  name: "News",
   methods: {
     show: function(e) {
       if (e.target.className == 'action') console.log("good");
     }
    },
  data: () => ({
    
    menuItems: [
      { 
       show: false,
       img: require('@/assets/news-img.jpg'),
       content: "The final line-up of 6 players in this double round-robin event was announced last week. Since then there has been a change as Dutch Grandmaster, Anish Giri, decided to withdraw due to growing concerns around the Covid-19 situation in the Netherlands...", 
       title: "Jan-krzysztof Duda to replace anish giri in tournament" 
      },
      { 
       show: false,
       img: require('@/assets/news-img1.jpg'),
       content: "GM Nodirbek Abdusattorov won the 19th Speed Chess Championship Grand Prix, his first victory in the series. The Uzbek grandmaster beat the GM Jose Martinez of Peru 1.5-0.5 in the knockout final. The final Speed Chess Championship Grand Prix...", 
       title: "Abdusattorov Wins 19th Speed Chess Grand Prix" 
      },
      { 
       show: false,
       img: require('@/assets/news-img2.jpg'),
       content: "The Starter was published in national newspapers and appeared on their websites. 947 Solutions were submitted, 635 of them correct, and 312 incorrect...", 
       title: "Winton British Chess – Starter Round results" 
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 50px 0;

  .v-card {
    width: 23%;
  }
}
.v-card__title {
  font-size: 1rem;
  line-height: 1rem;
} 
</style>
