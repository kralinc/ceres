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
import { buildUrl } from "@/util/util.js";

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
  methods: {
    onClear() {
      this.fetchRecipesEvent({ target: { value: "" } });
    },
    fetchRecipesEvent(event) {
      this.searchCounter++;
      let currentSearchCounter = this.searchCounter;
      let searchValue = event.target.value;
      if (searchValue.length > 2) {
        setTimeout(() => {
          this.fetchRecipes(currentSearchCounter, searchValue);
        }, 400);
      }
    },
    fetchRecipes(currentSearchCounter, searchValue) {
      if (this.searchCounter === currentSearchCounter) {
        fetch(buildUrl("recipes?name_like=" + searchValue))
          .then((response) => response.json())
          .then((data) => {
            this.recipes = data;
          })
          .catch((error) => {
            console.error("OOF GOT DAM");
            console.error(error);
          });
      }
    },
  },
  components: { RecipeSearchResults },
};
</script>
