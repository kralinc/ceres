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
      ></v-text-field>
      <RecipeSearchResults></RecipeSearchResults>
    </v-col>
  </v-row>
</template>

<script>
import RecipeSearchResults from "@/components/RecipeSearchResults.vue";

export default {
  name: "HomeView",
  methods: {
    onClear() {
      alert("wooza wawa");
    },
  },
  components: { RecipeSearchResults },
};
</script>
