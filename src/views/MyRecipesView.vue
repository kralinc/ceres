<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        id="search-box"
        label="Filter Pantry"
        prepend-inner-icon="mdi-magnify"
        clearable
        variant="solo"
        @click:clear="onClear"
        @input="filterRecipes"
        v-model="searchValue"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <RecipeSearchResults
      v-bind:recipes="visibleRecipeItems"
    ></RecipeSearchResults>
  </v-row>
</template>
<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";
import { postReq } from "@/util/util";
export default {
  name: "MyRecipesView",
  data() {
    return {
      recipeItems: [],
      visibleRecipeItems: [],
      searchValue: "",
      searchDialog: false,
    };
  },
  async mounted() {
    this.recipeItems = await postReq("v1/api/recipes/getPersonalRecipes", {});
    this.visibleRecipeItems = this.recipeItems;
  },
  methods: {
    onClear() {
      this.searchValue = "";
      this.filterRecipes();
    },
    filterRecipes() {
      this.visibleRecipeItems = this.recipeItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
  components: {
    RecipeSearchResults,
  },
};
</script>
