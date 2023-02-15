<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>MyKitchen</v-toolbar-title>

        <v-spacer></v-spacer>
        <router-link
          v-for="route of routes"
          :key="route.to"
          class="d-none d-sm-flex mr-3 router-link"
          :to="route.to"
        >
          <v-btn variant="tonal">
            {{ route.name }}
          </v-btn>
        </router-link>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <router-link v-for="route of routes" :key="route.to" :to="route.to">{{
          route.name
        }}</router-link>
      </v-navigation-drawer>
    </v-layout>
    <v-main>
      <router-view />
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
  color: white;
}
</style>
