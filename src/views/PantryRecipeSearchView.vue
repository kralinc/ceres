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
        @input="filterRecipes"
        v-model="searchValue"
      ></v-text-field>
      <RecipeSearchResults
        v-bind:recipes="visibleRecipes"
      ></RecipeSearchResults>
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
      filteredRecipes: [],
      visibleRecipes: [],
      searchValue: "",
      numPages: 0,
      pageSize: 10,
      page: 1,
    };
  },
  methods: {
    onClear() {
      this.searchValue = "";
      this.filterRecipes();
    },
    filterRecipes() {
      this.filteredRecipes = this.recipes.filter(
        (x) =>
          x.name.includes(this.searchValue) ||
          x.description.includes(this.searchValue)
      );
      this.doPagination();
    },
    doPagination() {
      this.numPages = Math.ceil(this.filteredRecipes.length / this.pageSize);
      this.visibleRecipes = this.filteredRecipes.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      if (this.page > this.numPages) {
        this.page = this.numPages;
      }
    },
    async fetchPantryRecipes() {
      this.filteredRecipes = this.recipes = await postReq(
        "v1/api/recipes/recipeWithInventory",
        { pageNumber: 0, pageSize: 99999 },
        { err: "There was a problem while fetching the recipes!" }
      );
      this.doPagination();
    },
    async changePage() {
      this.doPagination();
    },
  },
  mounted() {
    this.fetchPantryRecipes();
  },
  components: { RecipeSearchResults },
};
</script>
