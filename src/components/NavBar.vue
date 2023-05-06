<template>
  <v-app-bar color="green-darken-1" prominent>
    <v-row>
      <v-col align="left">
        <v-toolbar-title class="mt-2 ml-12">MyKitchen</v-toolbar-title></v-col
      >
      <v-col align="right">
        <v-btn icon class="mr-4">
          <v-avatar
            @click="OpenDrawer()"
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flaiacc.com%2Fwp-content%2Fuploads%2F2019%2F03%2Fblank-profile-picture-973460_1280-1030x1030.png&f=1&nofb=1&ipt=f032d3872e30736848e04996f09d8f8dd76ffa03858153596fdf7cacc5bfe63e&ipo=images"
          ></v-avatar>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flaiacc.com%2Fwp-content%2Fuploads%2F2019%2F03%2Fblank-profile-picture-973460_1280-1030x1030.png&f=1&nofb=1&ipt=f032d3872e30736848e04996f09d8f8dd76ffa03858153596fdf7cacc5bfe63e&ipo=images"
      >
        {{
          this.userInfo.firstName + " " + this.userInfo.lastName
        }}</v-list-item
      >
    </template>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <router-link to="/" class="router-link"
        ><v-list-item prepend-icon="mdi-home">Home</v-list-item></router-link
      >
      <router-link to="/login" class="router-link" v-if="!mainStore.isLoggedIn">
        <v-list-item prepend-icon="mdi-login">Login</v-list-item>
      </router-link>
      <router-link
        to="/signUp"
        class="router-link"
        v-if="!mainStore.isLoggedIn"
      >
        <v-list-item prepend-icon="mdi-login">Sign Up</v-list-item>
      </router-link>
      <router-link to="/pantry" class="router-link" v-if="mainStore.isLoggedIn">
        <v-list-item prepend-icon="mdi-book">Pantry</v-list-item>
      </router-link>
      <router-link
        to="/pantryRecipeSearch"
        class="router-link"
        v-if="mainStore.isLoggedIn"
      >
        <v-list-item prepend-icon="mdi-book-search"
          >Pantry Recipe Search</v-list-item
        >
      </router-link>
      <router-link
        to="/settings"
        class="router-link"
        v-if="mainStore.isLoggedIn"
      >
        <v-list-item prepend-icon="mdi-cog">Settings</v-list-item>
      </router-link>
      <router-link
        to="/myRecipes"
        class="router-link"
        v-if="mainStore.isLoggedIn"
      >
        <v-list-item prepend-icon="mdi-book">My Recipes</v-list-item>
      </router-link>
      <router-link
        to="/favoriteRecipes"
        class="router-link"
        v-if="mainStore.isLoggedIn"
      >
        <v-list-item prepend-icon="mdi-heart">Favorites</v-list-item>
      </router-link>
      <v-list-item
        @click="LogOff()"
        prepend-icon="mdi-logout"
        v-if="mainStore.isLoggedIn"
        >Log Off</v-list-item
      >
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";

export default {
  data() {
    return {
      drawer: false,
      userInfo: { firstName: "Welcome", lastName: "" },
    };
  },
  methods: {
    LogOff() {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("userInfo");
      this.mainStore.setLogin(false);
      this.mainStore.erasePantrySearchValues();
      (this.userInfo = { firstName: "Welcome", lastName: "" }),
        this.$router.push("/");
    },
    OpenDrawer() {
      this.GrabUserInfo();
      this.drawer = !this.drawer;
    },
    GrabUserInfo() {
      if (localStorage.getItem("userInfo") != null) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
