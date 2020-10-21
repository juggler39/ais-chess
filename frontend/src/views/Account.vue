<template>
  <div class="account">
    <h1>User Profile</h1>
    <v-container class="my-6">
      <v-row>
        <v-col class="col-12 col-md-5">
          <Avatar />
        </v-col>
        <v-col outline class="col-12 col-md-7">
          <v-card class="mb-2">
            <v-list>
              <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-content>
                  {{ item.title }}
                  {{ item.content }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <FormDialog
            :username.sync="items[0].content"
            :email.sync="items[1].content"
            :password.sync="password"
            :bio.sync="items[2].content"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import FormDialog from "@/components/FormDialog";

export default {
  name: "Account",
  components: { Avatar, FormDialog },
  data() {
    return {
      dialog: false,
      password: "",
      items: [
        { title: "Name: ", content: "name" },
        { title: "Email: ", content: "test@gmail.com" },
        { title: "Bio: ", content: "test" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.v-list-item {
  &:not(:last-child) {
    border-bottom: 1px solid #181818;
  }
}
</style>
