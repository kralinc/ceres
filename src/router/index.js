import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RecipeView from "../views/RecipeView.vue";
import PantryView from "../views/PantryView.vue";
import { useMainStore } from "@/stores/MainStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: RecipeView,
  },
  {
    path: "/pantry",
    name: "pantry",
    component: PantryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  if (to.matched.some((record) => record.meta.requiresAuth == true)) {
    if (localStorage.getItem("token") == null) {
      mainStore.setLogin(false);
      next({
        name: "login",
      });
    } else {
      mainStore.setLogin(true);
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth == false)) {
    if (localStorage.getItem("token") != null) {
      mainStore.setLogin(true);
      next({
        name: "home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
