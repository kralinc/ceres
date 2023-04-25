import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/authenticationform/LoginView.vue";
import SignUpView from "../views/authenticationform/SignUpView.vue";
import ForgotPassView from "../views/authenticationform/ForgotPassView.vue";
import ChangePassView from "../views/authenticationform/ChangePassView.vue";
import RecipeView from "../views/RecipeView.vue";
import PantryView from "../views/PantryView.vue";
import PantryRecipeSearchView from "../views/PantryRecipeSearchView.vue";
import UserSettingsView from "../views/UserSettingsView.vue";
import MyRecipesView from "../views/MyRecipesView.vue";
import myRecipesUpload from "../views/MyRecipesUploadView.vue";
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
    path: "/signUp",
    name: "signUp",
    component: SignUpView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: ForgotPassView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassView,
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pantryRecipeSearch",
    name: "pantryRecipeSearch",
    component: PantryRecipeSearchView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: UserSettingsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: MyRecipesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipeUpload",
    name: "myRecipeUpload",
    component: myRecipesUpload,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  const tokenTimestamp = localStorage.getItem("tokenTimestamp");

  if (tokenTimestamp == null || parseInt(tokenTimestamp) <= Date.now()) {
    mainStore.setLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenTimestamp");
    localStorage.removeItem("userInfo");
  }

  const isAuthorized = localStorage.getItem("token") != null;
  mainStore.setLogin(isAuthorized);

  if (to.matched.some((record) => record.meta.requiresAuth == true)) {
    if (!isAuthorized) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth == false)) {
    if (isAuthorized) {
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
