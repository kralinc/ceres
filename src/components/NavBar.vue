<template>
  <v-app-bar color="primary" prominent>
    <v-toolbar-title>MyKitchen</v-toolbar-title>

    <v-spacer></v-spacer>
    <Transition name="pop">
      <p class="avatar-name" v-if="drawer">Jane Smith</p>
    </Transition>
    <v-btn icon>
      <v-avatar
        @click="drawer = !drawer"
        image="https://randomuser.me/api/portraits/women/81.jpg"
      ></v-avatar>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        title="Jane Smith"
        subtitle="Logged in"
      ></v-list-item>
    </template>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <router-link to="/about" class="router-link"
        ><v-list-item>About</v-list-item></router-link
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
      routes: [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/login", name: "Login" },
      ],
    };
  },
  methods: {
    LogOff() {
      localStorage.removeItem("token");
      this.mainStore.setLogin(false);
      this.mainStore.erasePantrySearchValues();
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
