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
            v-model="pageData.searchValue"
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
        :recipes="pageData.visibleRecipes"
        :cardType="mainStore.cardType"
      ></RecipeSearchResults>
      <v-row>
        <v-col cols="10">
          <v-pagination
            v-model="pageData.page"
            class="my-4"
            :length="pageData.numPages"
            @update:model-value="changePage"
          ></v-pagination>
        </v-col>
        <v-col cols="2" class="d-flex align-center">
          <v-select
            label="Page Size"
            :items="[10, 15, 25, 50]"
            v-model="pageData.pageSize"
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
  props: ["requestInfo", "pageName"],
  data() {
    return {
      pageData: {
        recipes: [],
        filteredRecipes: [],
        visibleRecipes: [],
        searchValue: "",
        numPages: 0,
        pageSize: 10,
        page: 1,
      },
    };
  },
  methods: {
    onClear() {
      this.pageData.searchValue = "";
      this.filterRecipes();
    },
    filterRecipes() {
      this.pageData.filteredRecipes = this.pageData.recipes.filter(
        (x) =>
          x.name.includes(this.pageData.searchValue) ||
          x.description.includes(this.pageData.searchValue)
      );
      this.doPagination();
    },
    doPagination() {
      this.pageData.numPages = Math.ceil(
        this.pageData.filteredRecipes.length / this.pageData.pageSize
      );
      if (
        this.pageData.page > this.pageData.numPages ||
        this.pageData.page < 1
      ) {
        this.pageData.page = this.pageData.numPages;
      }
      this.pageData.visibleRecipes = this.pageData.filteredRecipes.slice(
        (this.pageData.page - 1) * this.pageData.pageSize,
        (this.pageData.page - 1) * this.pageData.pageSize +
          this.pageData.pageSize
      );
      this.cachePantrySearchValues();
    },
    async fetchPantryRecipes() {
      const recipeObjects = await postReq(
        this.requestInfo.url,
        this.requestInfo.data,
        { err: "There was a problem while fetching the recipes!" }
      );
      this.pageData.filteredRecipes = this.pageData.recipes = recipeObjects.map(
        (recipeObject) => {
          if (recipeObject.isSubbed) {
            recipeObject.recipe.toSub = recipeObject.foodIdToReplace;
            recipeObject.recipe.sub = recipeObject.subbedId;
            return recipeObject.recipe;
          } else {
            return recipeObject.recipe;
          }
        }
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
      this.mainStore.filterableRecipeSearchValues[this.pageName] =
        this.pageData;
    },
  },
  mounted() {
    if (this.mainStore.filterableRecipeSearchValues[this.pageName]) {
      this.pageData =
        this.mainStore.filterableRecipeSearchValues[this.pageName];
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
