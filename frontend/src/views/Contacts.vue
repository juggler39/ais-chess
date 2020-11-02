<template>
  <div class="contacts">
    <v-container class="wrapper-container">
      <h1 class="header">Our Team</h1>
      <div class="contacts-content">
        <div class="contacts-card" v-for="item in menuItems" :key="item.text">
          <v-img :src="getImg(item.img)"></v-img>
          <div class="content">
            <p class="title">{{ item.name }}</p>
            <p class="text">{{ item.text }}</p>
            <a :href="`mailto:${item.email}`">
              <v-icon>mdi-email</v-icon>
            </a>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  data: () => ({
    menuItems: [
      {
        img: "img1.jpg",
        name: "Ilya Maylychko",
        text:
          "Having friendliness and all qualities of a leader, Ilya successfully manages processes, quickly learns new technologies and responsibly approaches tasks.",
        email: "juggler39@yandex.ru"
      },
      {
        img: "img2.jpg",
        name: "Dzianis Shupenka",
        text:
          "Working hard Dzianis achieves great heights, there is nothing impossible for him. As friendly and sociable person he is always ready to help others.",
        email: "imxrayz@gmail.com"
      },
      {
        img: "img3.png",
        name: "Siarhei Eliseeu",
        text:
          "Siarhei is the most energetic, responsive and result oriented person. To deal with him is an immense pleasure. He is smart and strong person, who knows what he is doing and does it efficiently. ",
        email: "tapeghad@gmail.com"
      },
      {
        img: "img4.jpg",
        name: "Tatsiana Shulha",
        text:
          "As a FE Developer Tatsiana's main responsibilities are to desire for development, fresh look at things and willingness to learn new technologies.",
        email: "tsulga6@gmail.com"
      }
    ]
  }),
  methods: {
    getImg: function(img) {
      return require("@/assets/" + img);
    }
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  .header {
    text-align: center;
    margin-bottom: 50px;
  }
  .contacts-content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    .contacts-card {
      width: 50%;
      display: flex;

      .v-image {
        width: 50%;
      }

      @media (max-width: 991.98px) {
        width: 100%;
      }

      &:first-child {
        .content {
          .text {
            &::after {
              background-color: #ffee00;
            }
          }
        }
      }

      &:nth-child(2) {
        @media (max-width: 991.98px) {
          flex-direction: row-reverse;
        }
        .content {
          .text {
            &::after {
              background-color: #15ff00;
            }
          }
        }
      }
      &:nth-child(3) {
        flex-direction: row-reverse;
        @media (max-width: 991.98px) {
          flex-direction: row;
        }
        .content {
          .text {
            &::after {
              background-color: #0051ff;
            }
          }
        }
      }

      &:nth-child(4) {
        flex-direction: row-reverse;
        .content {
          .text {
            &::after {
              background-color: #ff0000;
            }
          }
        }
      }

      .content {
        width: 50%;
        padding: 10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #ffffff;
          opacity: 0.2;
        }

        .title,
        .text,
        a {
          opacity: 1;
          z-index: 3;
          position: relative;
        }

        a {
          transition: 0.3s ease-in;
          opacity: 0.7;
          text-decoration: none;

          &:hover {
            opacity: 1;
          }
        }

        .text {
          font-size: 14px;
          position: relative;
          padding-bottom: 15px;

          &::after {
            position: absolute;
            content: "";
            width: 50%;
            height: 2px;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
