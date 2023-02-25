<template>
  <v-row>
    <v-col cols="12" lg="12">
      <v-text-field
        id="search-box"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        clearable
        variant="solo"
        @click:clear="onClear"
        @input="fetchRecipesEvent"
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
            @update:model-value="fetchRecipesEvent"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";
import { postReq } from "@/util/util.js";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";

export default {
  name: "HomeView",
  data() {
    return {
      searchCounter: 0,
      searchValue: "",
      recipes: [],
      page: 1,
      numPages: 3,
      pageSize: 10,
    };
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    onClear() {
      this.fetchRecipesEvent({ target: { value: "" } });
    },
    async fetchRecipesEvent() {
      this.searchCounter++;
      let currentSearchCounter = this.searchCounter;
      if (this.searchValue.length > 2) {
        setTimeout(() => {
          this.fetchRecipes(currentSearchCounter, this.searchValue);
        }, 400);
      }
    },
    async fetchRecipes(currentSearchCounter, searchValue, pageNumber = 1) {
      if (this.searchCounter === currentSearchCounter) {
        this.page = pageNumber;
        this.mainStore.snackbar.active = false;
        const data = {
          query: { method: "name", value: searchValue },
          page: {
            pageNumber: "" + this.page,
            pageSize: parseInt(this.pageSize) - 1,
          },
        };
        const recipeResponse = await postReq(
          "v1/api/recipes/queryRecipes",
          data,
          this.showFailedRecipeSearchError
        );
        this.recipes = recipeResponse;
        if (this.recipes.length === 0) {
          this.mainStore.setSnackbar("Search returned no results.");
        }
      }
    },
    async changePage() {
      await this.fetchRecipes(this.searchCounter, this.searchValue, this.page);
      window.scrollTo(0, 0);
    },
    showFailedRecipeSearchError() {
      this.mainStore.setSnackbar(
        "There was an error while performing your search."
      );
    },
  },
  components: { RecipeSearchResults },
};
</script>
