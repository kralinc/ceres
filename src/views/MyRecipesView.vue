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
      <router-link to="/recipeUpload" class="router-link">
        <v-btn>Create Recipe</v-btn>
      </router-link>
    </v-col>
  </v-row>
  <v-row>
    <RecipeSearchResults
      v-if="this.visibleRecipeItems.length > 0"
      v-bind:recipes="visibleRecipeItems"
    ></RecipeSearchResults>
    <div class="text-h2" v-if="this.visibleRecipeItems <= 0">
      You don't have any personal recipes, go create some in the uhhh yeah.
    </div>
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
    if (this.recipeItems != "No Recipes Found") {
      this.visibleRecipeItems = this.recipeItems;
    }
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
