<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
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
