<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="10">
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
        </v-col>
        <v-col cols="2">
          <v-select
            :items="mainStore.cardTypes"
            v-model="mainStore.cardType"
          ></v-select>
        </v-col>
      </v-row>
      <RecipeSearchResults
        :recipes="recipes"
        :cardType="mainStore.cardType"
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
        <v-col cols="2" class="d-flex align-center">
          <v-select
            label="Page Size"
            :items="[10, 15, 25, 50]"
            v-model="pageSize"
            class="pageSizeSelect"
            @update:model-value="
              fetchRecipes(searchCounter, searchValue, pageNumber)
            "
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
import RecipeSearchResults from "@/components/recipesearch/RecipeSearchResults.vue";
import { postReq } from "@/util/util.js";

export default {
  name: "HomeView",
  data() {
    return {
      searchCounter: 0,
      searchValue: "",
      recipes: [],
      page: 1,
      numPages: 1,
      pageSize: 10,
    };
  },
  methods: {
    onClear() {
      this.fetchRecipesEvent({ target: { value: "" } });
      this.mainStore.recipeSearchValues = {};
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
            pageNumber: parseInt(this.page) - 1,
            pageSize: parseInt(this.pageSize),
          },
        };
        const recipeResponse = await postReq(
          "v1/api/recipes/queryRecipes",
          data,
          { err: "There was an error while performing your search." }
        );
        this.recipes = recipeResponse.results;
        this.numPages = recipeResponse.count;
        if (this.recipes.length === 0) {
          this.mainStore.setSnackbar("Search returned no results.");
        }
        this.saveValuesToStore();
      }
    },
    async changePage() {
      await this.fetchRecipes(this.searchCounter, this.searchValue, this.page);
      this.saveValuesToStore();
      window.scrollTo(0, 0);
    },
    saveValuesToStore() {
      this.mainStore.recipeSearchValues.searchValue = this.searchValue;
      this.mainStore.recipeSearchValues.recipes = this.recipes;
      this.mainStore.recipeSearchValues.numPages = this.numPages;
      this.mainStore.recipeSearchValues.page = this.page;
      this.mainStore.recipeSearchValues.pageSize = this.pageSize;
    },
  },
  async mounted() {
    if (Object.keys(this.mainStore.recipeSearchValues).length !== 0) {
      this.searchValue = this.mainStore.recipeSearchValues.searchValue;
      this.recipes = this.mainStore.recipeSearchValues.recipes;
      this.numPages = this.mainStore.recipeSearchValues.numPages;
      this.page = this.mainStore.recipeSearchValues.page;
      this.pageSize = this.mainStore.recipeSearchValues.pageSize;
    } else {
      await this.fetchRecipes(this.searchCounter, "");
    }
  },
  computed: {
    ...mapStores(useMainStore),
  },
  components: { RecipeSearchResults },
};
</script>
