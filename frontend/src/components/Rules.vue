<template>
  <div class="rules">
    <div class="first-card" :id="items[0].id">
      <h2 class="title">{{ items[0].title }}</h2>
      <p class="text">{{ items[0].content[0] }}</p>
      <v-img :src="getImg(items[0].img[0])"></v-img>
      <v-img :src="getImg(items[0].img[1])"></v-img>
      <p class="text">{{ items[0].content[1] }}</p>
    </div>
    <div class="second-card" :id="items[1].id">
      <h2 class="title">{{ items[1].title }}</h2>
      <p class="text">{{ items[1].content }}</p>
    </div>
    <div
      class="same-card"
      v-for="item in sameItems"
      v-bind:key="item.title"
      :id="item.id"
    >
      <h2 class="title">{{ item.title }}</h2>
      <p class="text">{{ item.content[0] }}</p>
      <div class="video">
        <iframe
          :src="getVideo(item.videoId)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <v-img :src="getImg(item.img)"></v-img>
      <p class="text">{{ item.content[1] }}</p>
    </div>
    <div class="card" :id="items[3].id">
      <h2 class="title">{{ items[3].title }}</h2>
      <p class="text">{{ items[3].content[0] }}</p>
      <v-img :src="getImg(items[3].img[0])"></v-img>
      <v-img :src="getImg(items[3].img[1])"></v-img>
      <p class="text">{{ items[3].content[1] }}</p>
      <div class="video">
        <iframe
          :src="getVideo(items[3].videoId)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
    <div class="last-card" :id="items[4].id">
      <h2 class="title">{{ items[4].title }}</h2>
      <p class="text">{{ items[4].content[0] }}</p>
      <ul>
        <li>{{ items[4].content[1] }}</li>
        <li>{{ items[4].content[2] }}</li>
        <li>{{ items[4].content[3] }}</li>
        <li>{{ items[4].content[4] }}</li>
      </ul>
      <div class="video">
        <iframe
          :src="getVideo(items[4].videoId)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <p class="text">{{ items[4].content[5] }}</p>
    </div>
  </div>
</template>

<script>
import Json from "@/assets/cards/cards.json";
export default {
  name: "Rules",
  data() {
    return {
      items: Json.menuItems,
      sameItems: Json.menuItems[2].sameItems
    };
  },
  methods: {
    getImg: function(img) {
      return require("@/assets/cards/" + img);
    },
    getVideo: function(id) {
      return `https://www.youtube.com/embed/${id}/`;
    }
  }
};
</script>
<style lang="scss" scoped>
.rules {
  background: rgba(0, 0, 0, 0.8);

  .title {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px !important;

    @media (max-width: 767.98px) {
      font-size: 18px !important;
    }
  }

  .text {
    padding: 0 15px;

    @media (max-width: 767.98px) {
      padding: 10px;
    }
  }

  .first-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .text {
      width: 60%;

      @media (max-width: 767.98px) {
        width: 100%;
      }
    }

    .v-image {
      width: 35%;

      @media (max-width: 767.98px) {
        margin: 10px;
      }
    }
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .text {
      width: 50%;

      @media (max-width: 767.98px) {
        width: 100%;
      }
    }

    .v-image {
      width: 35%;

      @media (max-width: 767.98px) {
        margin: 10px;
      }
    }

    .video {
      width: 60%;
      padding-bottom: 30%;
      margin: 20px auto 0 auto;
    }
  }

  .last-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .video {
      width: 60%;
      padding-bottom: 30%;
      margin: 20px auto;
    }
  }

  .same-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .text {
      width: 50%;

      @media (max-width: 767.98px) {
        width: 100%;
      }
    }

    .v-image {
      width: 35%;

      @media (max-width: 767.98px) {
        margin: 10px;
      }
    }

    .video {
      width: 45%;
      padding-bottom: 30%;

      @media (max-width: 767.98px) {
        width: 60%;
        padding-bottom: 50%;
        margin: 20px auto;
      }
    }
  }

  .video {
    height: 0;
    position: relative;

    iframe {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
