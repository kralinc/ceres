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
        @input="fetchRecipesEvent($event)"
      ></v-text-field>
      <RecipeSearchResults v-bind:recipes="recipes"></RecipeSearchResults>
      <v-pagination
        v-model="page"
        class="my-4"
        :length="numPages"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";
import { getReq } from "@/util/util.js";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";

export default {
  name: "HomeView",
  data() {
    return {
      searchCounter: 0,
      recipes: [],
      page: 1,
      numPages: 1,
    };
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    onClear() {
      this.fetchRecipesEvent({ target: { value: "" } });
    },
    async fetchRecipesEvent(event) {
      this.searchCounter++;
      let currentSearchCounter = this.searchCounter;
      let searchValue = event.target.value;
      if (searchValue.length > 2) {
        setTimeout(() => {
          this.fetchRecipes(currentSearchCounter, searchValue);
        }, 400);
      }
    },
    async fetchRecipes(currentSearchCounter, searchValue) {
      if (this.searchCounter === currentSearchCounter) {
        this.recipes = await getReq(
          "recipes?name_like=" + searchValue,
          this.showFailedRecipeSearchError
        );
      }
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
