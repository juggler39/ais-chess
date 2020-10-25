<template>
  <div class="not-found">
    <v-container class="wrapper-container">
      <div class="not-found-layout">
        <div class="not-found-content">
          <h1>404</h1>
          <h3>page not found</h3>
        </div>
        <div class="container-figure">
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

    @media (max-width: 767.98px) {
      width: 100%;
    }

    @media (max-width: 575.98px) {
      width: 100%;
      flex-direction: column;
    }
  }

  .not-found-content {
    h1 {
      color: #ededed;
      text-align: center;
      font-size: 7em;
      margin: 0;
      text-shadow: -1px 0 #bfc0c0, 0 1px #bfc0c0, 1px 0 #bfc0c0, 0 -1px #bfc0c0;
    }
    h3 {
      font-size: 1.5em;
      text-transform: uppercase;
      text-align: center;
      color: #bfc0c0;
      font-weight: 900;
    }
  }

  .btn {
    background: #ededed;
    padding: 15px 20px;
    margin-top: 50px;
    color: #585959;
    width: 150px;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.6em;
    letter-spacing: 1px;
    border: 0;
    border-radius: 5px;
    text-decoration: none;

    &:hover {
      background: #bfc0c0;
      transition: all 0.4s ease-out;
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
      color: #e7e7e7;
    }

    .shadow {
      position: absolute;
      width: 30%;
      height: 7%;
      background: #bfc0c0;
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
