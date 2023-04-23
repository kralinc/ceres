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
            @input="filterRecipes"
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
        :recipes="visibleRecipes"
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
        <v-col cols="2">
          <v-select
            label="Page Size"
            :items="[10, 15, 25, 50]"
            v-model="pageSize"
            class="pageSizeSelect"
            @update:model-value="changePageSize"
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
      if (this.page > this.numPages || this.page < 1) {
        this.page = this.numPages;
      }
      this.visibleRecipes = this.filteredRecipes.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      this.cachePantrySearchValues();
    },
    async fetchPantryRecipes() {
      const recipeObjects = await postReq(
        "v1/api/recipes/recipeWithInventory",
        { pageNumber: 0, pageSize: 99999 },
        { err: "There was a problem while fetching the recipes!" }
      );
      this.filteredRecipes = this.recipes = recipeObjects.map(
        (recipeObject) => recipeObject.recipe
      );
      this.cachePantrySearchValues();
      this.doPagination();
    },
    async changePage() {
      this.cachePantrySearchValues();
      this.doPagination();
    },
    changePageSize() {
      this.cachePantrySearchValues();
      this.doPagination();
    },
    cachePantrySearchValues() {
      this.mainStore.pantrySearchValues.recipes = this.recipes;
      this.mainStore.pantrySearchValues.filteredRecipes = this.filteredRecipes;
      this.mainStore.pantrySearchValues.visibleRecipes = this.visibleRecipes;
      this.mainStore.pantrySearchValues.numPages = this.numPages;
      this.mainStore.pantrySearchValues.searchValue = this.searchValue;
      this.mainStore.pantrySearchValues.pageSize = this.pageSize;
      this.mainStore.pantrySearchValues.page = this.page;
    },
  },
  mounted() {
    if (this.mainStore.pantrySearchValues.recipes) {
      this.recipes = this.mainStore.pantrySearchValues.recipes;
      this.filteredRecipes = this.mainStore.pantrySearchValues.filteredRecipes;
      this.visibleRecipes = this.mainStore.pantrySearchValues.visibleRecipes;
      this.searchValue = this.mainStore.pantrySearchValues.searchValue;
      this.pageSize = this.mainStore.pantrySearchValues.pageSize;
      this.page = this.mainStore.pantrySearchValues.page;
      this.numPages = this.mainStore.pantrySearchValues.numPages;
    } else {
      this.fetchPantryRecipes();
    }
  },
  computed: {
    ...mapStores(useMainStore),
  },
  components: { RecipeSearchResults },
};
</script>
