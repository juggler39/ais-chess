<template>
  <div class="not-found">
    <v-container class="wrapper-container">
      <div class="not-found-layout">
        <div class="not-found-content">
          <h1>404</h1>
          <h3>page not found</h3>
        </div>
        <div class="container-figure">
          <!-- <div class="ghost-copy">
            <div class="one"></div>
            <div class="two"></div>
            <div class="three"></div>
            <div class="four"></div>
          </div>
          <div class="ghost">
            <div class="face">
            <div class="eye"></div>
            <div class="eye-right"></div>
            <div class="mouth"></div>
          </div>
          </div> -->
          <div class="chess-figure">&#9822;</div>
          <div class="shadow"></div>
        </div>
      </div>
      <a href="/" class="btn">Home</a>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
.not-found {
  .wrapper-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .not-found-layout {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 60%;
  }

  .not-found-content {
    h1 {
      color: #EDEDED;
      text-align: center;
      font-size: 7em;
      margin: 0;
      text-shadow: -1px 0 #BFC0C0, 0 1px #BFC0C0, 1px 0 #BFC0C0, 0 -1px #BFC0C0;
    }
    h3 {
      font-size: 1.5em;
      text-transform: uppercase;
      text-align: center;
      color: #BFC0C0;
      font-weight: 900;
    }
  }

  .btn {
    background: #EDEDED;
    padding: 15px 20px;
    margin-top: 50px;
    color: #585959;
    width: 150px;
    text-align:center;
    text-transform: uppercase;
    font-size: .6em;
    letter-spacing: 1px;
    border: 0;
    border-radius: 5px;
    text-decoration: none;

    &:hover {
      background: #BFC0C0;
      transition: all .4s ease-out;
    }
  }

  .container-figure {
    position: relative;
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;

    .chess-figure {
      font-size: 160px;
      animation: float 2s ease-out infinite;
      color:  #e7e7e7;
    }

    .shadow {
      position: absolute;
      width: 30%;
      height: 7%;
      background: #BFC0C0;
      left: 38%;
      top: 80%;
      border-radius: 50%;
      animation: scale 2s infinite;
    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes float {
    50% {
     transform: translateY(15px);
    }
  }
}
</style>
