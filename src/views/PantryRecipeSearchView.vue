<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        id="search-box"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        clearable
        variant="solo"
        @click:clear="onClear"
        @input="filterRecipesEvent"
        v-model="searchValue"
      ></v-text-field>
      <RecipeSearchResults v-bind:recipes="recipes"></RecipeSearchResults>
      <v-row>
        <v-col cols="10">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="numPages"
            @update:model-value="changePage"
          ></v-pagination>
        </v-col>
        <v-col cols="2">
          <v-select
            label="Page Size"
            :items="[10, 15, 25, 50]"
            v-model="pageSize"
            class="pageSizeSelect"
            @update:model-value="fetchPantryRecipes"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";
import { postReq } from "@/util/util";
export default {
  name: "PantryRecipeSearchView",
  data() {
    return {
      recipes: [],
      searchValue: "",
      numPages: 0,
      pageSize: 10,
      page: 0,
    };
  },
  methods: {
    onClear() {
      return;
    },
    filterRecipesEvent() {
      return;
    },
    async fetchPantryRecipes() {
      this.recipes = await postReq(
        "v1/api/recipes/recipeWithInventory",
        { pageNumber: this.page, pageSize: this.pageSize },
        { err: "There was a problem while fetching the recipes!" }
      );
    },
    async changePage() {
      this.fetchPantryRecipes();
    },
  },
  mounted() {
    this.fetchPantryRecipes();
  },
  components: { RecipeSearchResults },
};
</script>
