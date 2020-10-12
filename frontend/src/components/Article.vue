<template>
 <article class="col-sm-12">
  <nav aria-label="breadcrumb">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><router-link :to="'/'">Home</router-link></li>
      <li class="breadcrumb-item active" aria-current="page">{{ $route.params.title }}</li>
    </ul>
  </nav>
  <div class="card">
    <h1>{{ $route.params.title }}</h1>
    <p>{{ $route.params.content }}</p>
    <img :src="$route.params.img" alt="">
  </div>
 </article>
</template>

<script>

export default {
  name: "Article"
}
</script>

<style lang="scss" scoped>
  
</style>