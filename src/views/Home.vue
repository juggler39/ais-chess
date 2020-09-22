<template>
  <div class="home">
    <h1>Homepage</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ab
      obcaecati quod ad quis doloremque debitis praesentium hic dolorem
      veritatis, est, dolor sapiente, sunt consectetur rerum aspernatur nemo
      nobis explicabo!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora neque
      quas, minus, dolorem quae nemo perferendis eligendi sequi ipsam iste ut.
      Earum accusamus rem illum, consequatur quaerat adipisci ratione a?
    </p>
    <v-btn>
      <v-icon>mdi-home</v-icon>
      <span>Click me</span>
    </v-btn>
    <v-btn>
      <v-icon fab>mdi-heart</v-icon>
      <span>Click me</span>
    </v-btn>
    <v-btn class="hidden-md-and-up">
      <v-icon>mdi-email</v-icon>
      <span>Click me</span>
    </v-btn>
    <v-btn icon color="pink" class="hidden-md-and-down">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home"
};
</script>
