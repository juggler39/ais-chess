<template>
  <v-footer>
    <div class="footer__navigation container">
      <nav>
        <p class="nav_header">Menu</p>
        <ul>
          <li v-for="link in menuLinks" :key="link.point">
            <router-link :to="link.route" class="footer-link">
              {{ link.point }}
            </router-link>
          </li>
        </ul>
      </nav>
      <nav>
        <p class="nav_header">Contact Us</p>
        <ul class="social-buttons">
          <li v-for="link in socialLinks" :key="link.text">
            <router-link
              :to="'//' + link.url"
              class="social-btn"
              target="_blank"
            >
              <v-icon center>{{ link.icon }}</v-icon>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="footer_logo">
        <v-img src="@/assets/new-logo.png"></v-img>
      </div>
      <form @submit.prevent="action()">
        <p class="nav_header">Stay Connected</p>
        <div class="form-input">
          <input v-model="email" type="email" placeholder="Email" required />
          <button type="submit">
            SEND
          </button>
        </div>
      </form>
    </div>
    <span class="small-txt">
      Made by the best team &copy;
      {{ new Date().getFullYear() }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    menuLinks: [
      { point: "Home", route: "/home" },
      { point: "Account", route: "/acc" },
      { point: "Lobby", route: "/lobby" }
    ],
    socialLinks: [
      { text: "Twitter", icon: "mdi-twitter", url: "www.twitter.com" },
      { text: "Vkontakte", icon: "mdi-vk", url: "vk.com" },
      { text: "LinkedIn", icon: "mdi-linkedin", url: "www.linkedin.com" },
      { text: "Gmail", icon: "mdi-gmail", url: "mail.google.com" }
    ],
    email: null
  })
};
</script>

<style lang="scss" scoped>
.v-footer {
  border-top: 1px solid #666;
  background: rgba(70, 70, 70, 0.4) !important;
  flex: 0 0 auto;
  margin-top: 50px;

  .social-buttons {
    display: flex;

    .social-btn {
      border-radius: 50px;
      text-decoration: none;
      padding: 7px 5px;
      margin-right: 5px;
      transition: 0.3s;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }
    }
  }
}
.footer__navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #ffffff;
  padding: 20px 0;

  .form-input {
    display: flex;
    width: 100%;

    input[type="email"] {
      width: 70%;
      padding: 5px;
      outline: none;
      transition: 0.3s;
      background-color: #272727;
      &:hover,
      &:focus {
        background-color: #3f3f3f;
      }
    }
    button[type="submit"] {
      width: 30%;
      border-left: 1px solid #202020;
      background-color: #202020;
      color: #444444;
      padding: 5px;
      outline: none;
      transition: 0.3s;
      &:hover,
      &:focus {
        background-color: #383838;
        color: #202020;
      }
    }
  }

  .footer_logo {
    width: 13%;
  }

  nav,
  form {
    width: 23%;

    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;

      .footer-link {
        text-decoration: none;
        color: #949494;
        transition: 0.3s;

        &:hover {
          color: #ffffff;
        }
      }
    }
  }

  .nav_header {
    position: relative;
    padding-bottom: 2px;

    &::after {
      content: "";
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #616161;
      opacity: 0.2;
    }
  }
}

.small-txt {
  font-size: 12px;
  color: #777777;
  text-align: center;
  width: 100%;
}
</style>
