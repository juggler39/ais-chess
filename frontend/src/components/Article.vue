<template>
 <article class="col-sm-12">
  <nav aria-label="breadcrumbs">
    <ul class="breadcrumbs">
      <li class="breadcrumb-item"><router-link :to="'/'">Home</router-link></li>
      <span>/</span>
      <li class="breadcrumb-item active" aria-current="page">{{ $route.params.title }}</li>
    </ul>
  </nav>
  <div class="card">
    <h1 class="header">{{ $route.params.title }}</h1>
    <p class="content"><img class="image" :src="$route.params.img" alt="">{{ $route.params.content }}</p>
  </div>
 </article>
</template>

<script>

export default {
  name: "Article"
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  .breadcrumb-item, span {
    margin: 10px 5px;
    font-size: 12px;
    color: #464646;
    .router-link-active {
      color: #464646;
      text-decoration: none;
      transition: 0.3s;
      &:hover {
        color: #7a7a7a;
      }
    }
    &.active {
      color:  #7a7a7a;
    }
  }
}
.card {
  padding: 50px 0 0 0;
  .content {
    padding: 50px 0;
  }
  .image {
    float: right;
    width: 300px;
    margin: 10px;
  }
}
</style>