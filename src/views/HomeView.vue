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
    </v-col>
  </v-row>
</template>

<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";
import { buildUrl } from "@/util/util.js";

export default {
  name: "HomeView",
  data() {
    return {
      searchCounter: 0,
      recipes: [],
    };
  },
  methods: {
    onClear() {
      this.searchCounter++;
    },
    fetchRecipesEvent(event) {
      this.searchCounter++;
      let currentSearchCounter = this.searchCounter;
      let searchValue = event.target.value;
      setTimeout(() => {
        this.fetchRecipes(currentSearchCounter, searchValue);
      }, 400);
    },
    fetchRecipes(currentSearchCounter, searchValue) {
      if (this.searchCounter === currentSearchCounter) {
        console.log(searchValue);
        console.log(buildUrl("api/v1/getRecipes"));
      }
    },
  },
  components: { RecipeSearchResults },
};
</script>
