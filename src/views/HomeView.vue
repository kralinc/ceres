<template>
  <v-row>
    <v-col cols="10">
      <v-text-field
        label="Search"
        prepend-inner-icon="mdi-magnify"
        clearable
        variant="solo"
        @click:clear="onClear"
      ></v-text-field>
      <v-row>
        <RecipeSearchResults></RecipeSearchResults>
      </v-row>
    </v-col>
    <v-col cols="2">
      <h1>Pantry</h1>
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
