<template>
  <v-row v-if="cardType === 'Card'">
    <RecipeCard
      v-for="recipe of recipes"
      :key="recipe.id"
      v-bind:recipeProp="recipe"
    ></RecipeCard>
  </v-row>
  <v-row v-if="cardType === 'List'">
    <RecipeTable :recipes="recipes"></RecipeTable>
  </v-row>
</template>

<script>
import RecipeTable from "./RecipeTable.vue";
import RecipeCard from "./RecipeCard.vue";
export default {
  props: ["recipes", "cardType"],
  components: { RecipeTable, RecipeCard },
};
</script>
