<template>
  <div>
    <div>
      <div v-for="publish in publishers" :key="publish.id">
        <div class="card">
          <div>
            <div class="md-title">{{ publish.name }}</div>
          </div>

          <div>
            {{ publish.description }}
          </div>

          <div>
            <div @click="getFeed(publish)">Read more</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publishers: ""
    };
  },
  methods: {
    initData: function() {
      this.$http
        .get("https://www.chess.com/news/view/published-data-api")
        .then(function(res) {
          console.log(res);
          this.publishers = res.body.sources;
        })
        .catch(function(err) {
          this.publishers = err;
        });
    },
    readMore: function(publish) {
      window.open(publish.url, "_blank");
    },
    getFeed: function(publish) {
      this.$router.push({ name: "News", params: { id: publish.id } });
    }
  },
  created: function() {
    this.initData();
  }
};
</script>

<style>
.card {
  width: 80%;
  margin-bottom: 20px;
}
</style>
