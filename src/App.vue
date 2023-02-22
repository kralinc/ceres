<script setup>
import { useMainStore } from "./stores/MainStore";

const mainStore = useMainStore();
</script>

<template>
  <v-app>
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
        <router-link to="/about" class="router-link" v-if="mainStore.isLoggedIn"
          ><v-list-item prepend-icon="mdi-logout"
            >Logout</v-list-item
          ></router-link
        >
        <router-link to="/login" class="router-link" v-if="mainStore.isLoggedIn"
          ><v-list-item prepend-icon="mdi-login"
            >Login</v-list-item
          ></router-link
        >
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
