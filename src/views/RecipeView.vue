<template>
  <div>Recipe #{{ $route.params.id }}</div>
</template>

<script>
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
  methods: {
    async loadRecipe(id) {
      this.recipe = await getReq("/api/v1/recipes/" + id);
    },
  },
};
</script>
