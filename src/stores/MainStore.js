import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      auth: false,
      snackbar: { active: false, color: "", message: "" },
      recipeSearchValues: {},
      pantrySearchValues: {},
      metric: false,
    };
  },
  actions: {
    setSnackbar(message, color) {
      this.snackbar.active = true;
      this.snackbar.message = message;
      this.snackbar.color = color ? color : "red-darken-3";
    },
    setLogin(isLoggedIn) {
      console.log("I GOT IT");
      this.auth = isLoggedIn;
    },
    erasePantrySearchValues() {
      this.pantrySearchValues = {};
    },
    setMetric(value) {
      this.metric = value;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.auth;
    },
  },
});
