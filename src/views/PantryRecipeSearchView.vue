<template>
  <FilterableRecipeSearch
    :requestInfo="requestInfo"
    :pageName="name"
  ></FilterableRecipeSearch>
</template>
<script>
import FilterableRecipeSearch from "@/components/FilterableRecipeSearch.vue";
export default {
  name: "PantryRecipeSearchView",
  data() {
    return {
      requestInfo: {
        url: "v1/api/recipes/recipeWithInventory",
        data: { pageNumber: 0, pageSize: 99999 },
      },
      name: "pantryRecipes",
    };
  },
  components: { FilterableRecipeSearch },
};
</script>
