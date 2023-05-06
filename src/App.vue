<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container class="container">
        <router-view />
      </v-container>
      <v-snackbar
        class="font-weight-bold"
        id="popup"
        v-model="mainStore.snackbar.active"
        :timeout="-1"
        :color="mainStore.snackbar.color"
        variant="outlined"
      >
        {{ mainStore.snackbar.message }}
        <template v-slot:actions>
          <v-btn
            class="font-weight-bold"
            color="mainStore.snackbar.color"
            variant="text"
            @click="mainStore.snackbar.active = false"
          >
            Close
          </v-btn>
        </template></v-snackbar
      >
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

import { mapStores } from "pinia";
import { useMainStore } from "./stores/MainStore";

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
  computed: {
    ...mapStores(useMainStore),
  },
  components: { NavBar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
.container {
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.router-link {
  text-decoration: none;
}

.pop-enter-active,
.pop-leave.active {
  transition: all 0.2s ease;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
