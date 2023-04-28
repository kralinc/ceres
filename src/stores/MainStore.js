import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      auth: false,
      snackbar: { active: false, color: "", message: "" },
      recipeSearchValues: {},
      filterableRecipeSearchValues: {},
      metric: false,
      cardType: "Card",
      cardTypes: ["Card", "List"],
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
      this.filterableRecipeSearchValues = {};
    },
    setMetric(value) {
      this.metric = value;
    },
    setListType(value) {
      this.listType = value;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.auth;
    },
  },
});
