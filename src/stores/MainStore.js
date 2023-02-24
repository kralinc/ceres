import { defineStore } from "pinia";

export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      jwt: 0,
    };
  },

  getters: {
    isLoggedIn: () => true,
  },
});
