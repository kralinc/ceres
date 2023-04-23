<template>
  <v-row>
    <v-col cols="12" sm="9" md="10">
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
    <v-col cols="12" sm="3" md="2" align-self="start">
      <router-link to="/recipeUpload" class="router-link">
        <v-btn class="font-weight-bold mt-2" prepend-icon="mdi-plus"
          >Add Recipe</v-btn
        >
      </router-link>
    </v-col>
  </v-row>
  <v-row justify="center">
    <RecipeSearchResults
      v-if="this.visibleRecipeItems.length > 0"
      v-bind:recipes="visibleRecipeItems"
    ></RecipeSearchResults>
    <div class="text-h2" v-if="this.visibleRecipeItems <= 0">
      You don't have any personal recipes, trying adding some!
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
