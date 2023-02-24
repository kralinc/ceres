<script setup>
import RecipeCardList from "./recipecards/RecipeCard.vue";
</script>

<template>
  <v-row v-if="cardType === 'list'">
    <RecipeCardList
      v-for="recipe of recipes"
      :key="recipe.id"
      v-bind:recipeProp="recipe"
      v-bind:cardType="cardType"
    ></RecipeCardList>
  </v-row>
</template>

<script>
export default {
  props: {
    recipes: Array,
  },
  data() {
    return {
      cardType: "list",
    };
  },
};
</script>
