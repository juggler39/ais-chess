<template>
  <div class="rating-table">
    <p class="subtitle">Hall of fame</p>
    <v-simple-table class="my-5">
      <template>
        <thead>
          <tr>
            <th class="text-left">
              <p>Player</p>
            </th>
            <th class="text-left">
              <p>Rating</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players" :key="player._id">
            <td>{{ player.name }}</td>
            <td>{{ player.rating }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";

// @ is an alias to /src

export default {
  name: "Rating",
  data() {
    return {
      players: []
    };
  },
  mounted() {
    axios
      .get("/api/users/top10")
      .then(response => {
        this.players = response.data.users;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss" scoped>
.rating-table {
  .subtitle {
    font-size: 1.5rem;
    line-height: 1.25rem;
    color: #fff;
    text-shadow: 0 0 10px #3d7a97;
    letter-spacing: 1px;

    @media (max-width: 767.98px) {
      margin: 0 1em;
    }
  }

  .v-data-table {
    background-color: transparent;

    thead {
      background-color: rgba(27, 27, 27, 0.7);
    }

    .v-data-table__wrapper {
      border-radius: 10px;
    }

    th p {
      color: #ffffff;
      font-size: 20px;
      margin: 0;
      letter-spacing: 1px;
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: rgba(34, 34, 34, 0.7);

        &:hover {
          background-color: rgba(34, 34, 34, 0.7) !important;
        }
      }

      &:nth-child(even) {
        background-color: rgba(27, 27, 27, 0.7);

        &:hover {
          background-color: rgba(27, 27, 27, 0.7) !important;
        }
      }
    }
  }
}
</style>
