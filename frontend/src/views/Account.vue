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
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <FormDialog />
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
      items: [
        { title: "Name: test" },
        { title: "Email: test@test.com" },
        { title: "Interests: test, test" }
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
