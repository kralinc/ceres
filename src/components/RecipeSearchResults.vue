<template>
  <v-col v-for="recipe of recipes" :key="recipe.id">
    <v-card>
      <v-card-title>{{ recipe.name }}</v-card-title>
      <v-spacer></v-spacer>
      <v-rating hover></v-rating>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    //recipes: Array,
  },
  data() {
    return {
      recipes: [{ id: 1, name: "Bibimbap" }],
    };
  },
};
</script>
