<template>
  <div class="not-found">
    <v-container class="wrapper-container">
      <div class="not-found-layout">
        <div class="not-found-content">
          <h1>404</h1>
          <h3>page not found</h3>
        </div>
        <div class="container-ghost">
          <div class="ghost-copy">
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
          </div>
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

  .container-ghost {
    position: relative;
    width: 250px;
    height: 250px;

    .ghost {
      width: 50%;
      height: 53%;
      left: 25%;
      top: 10%;
      position: absolute;
      border-radius: 50% 50% 0 0;
      background: #EDEDED;
      border: 1px solid #BFC0C0;
      border-bottom: none;
      animation: float 2s ease-out infinite;

      .face {
        position: absolute;
        width: 100%;
        height: 60%;
        top: 20%;
      }
      .eye, .eye-right {
        position: absolute;
        background: #585959;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        top: 40%;
      }

      .eye {
        left: 25%;
      }
      .eye-right {
        right: 25%;
      }

      .mouth {
        position:absolute;
        top: 50%;
        left: 45%;
        width: 10px;
        height: 10px;
        border: 3px solid;
        border-radius: 50%;
        border-color: transparent #585959 #585959 transparent;
        transform: rotate(45deg);
      }
    }

    .ghost-copy {
      width: 50%;
      height: 53%;
      left: 25%;
      top: 10%;
      position: absolute;
      border-radius: 50% 50% 0 0;
      background: #EDEDED;
      border: 1px solid #BFC0C0;
      border-bottom: none;
      animation: float 2s ease-out infinite;
      z-index: 0;

      .one, .two, .three, .four {
        position: absolute;
        background: #EDEDED;
        top: 85%;
        width: 25%;
        height: 23%;
        border: 1px solid #BFC0C0;
        z-index: 0;
      }

      .one {
        border-radius: 0 0 100% 30%;
        left: -1px;
      }

      .two {
        left: 23%;
        border-radius: 0 0 50% 50%;
      }

      .three {
        left: 50%;
        border-radius: 0 0 50% 50%;
      }

      .four {
        left: 74.5%;
        border-radius: 0 0 30% 100%;
      }
    }

    .shadow {
      position: absolute;
      width: 30%;
      height: 7%;
      background: #BFC0C0;
      left: 35%;
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
