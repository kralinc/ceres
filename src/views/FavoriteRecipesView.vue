<template>
  <FilterableRecipeSearch
    :requestInfo="requestInfo"
    :pageName="name"
  ></FilterableRecipeSearch>
</template>
<script>
import FilterableRecipeSearch from "@/components/FilterableRecipeSearch.vue";
export default {
  name: "FavoriteRecipesView",
  data() {
    return {
      requestInfo: {
        url: "v1/api/recipes/getFavoriteRecipes",
        data: {},
      },
      name: "favoriteRecipes",
    };
  },
  components: { FilterableRecipeSearch },
};
</script>
