<template>
  <div>Recipe #{{ recipe }}</div>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { getReq } from "@/util/util.js";

export default {
  name: "RecipeView",
  mounted() {
    this.loadRecipe(this.$route.params.id);
  },
  data() {
    return {
      recipeId: -1,
      recipe: Object,
    };
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    async loadRecipe(id) {
      this.recipe = await getReq("recipes/" + id, this.showLoadRecipeError);
    },

    showLoadRecipeError() {
      this.mainStore.setSnackbar("There was a problem loading the recipe!");
    },
  },
};
</script>
