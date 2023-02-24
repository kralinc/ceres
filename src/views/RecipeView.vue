<template>
  <div>Recipe #{{ $route.params.id }}</div>
</template>

<script>
export default {
  name: "RecipeView",
  data() {
    return {
      recipeId: -1,
    };
  },
};
</script>
