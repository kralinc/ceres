import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      jwt: 0,
      snackbar: { active: false, color: "", message: "" },
    };
  },
  actions: {
    setSnackbar(message, color) {
      this.snackbar.active = true;
      this.snackbar.message = message;
      this.snackbar.color = color ? color : "red-darken-3";
    },
  },
  getters: {
    isLoggedIn: () => true,
  },
});
