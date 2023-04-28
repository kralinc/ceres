<template>
  <v-col cols="12" lg="6" @click="gotoRecipePage(recipe.id)">
    <v-card variant="tonal" class="recipe-card">
      <v-row>
        <v-col cols="4" class="d-flex">
          <v-img
            class="img-fluid"
            :src="
              recipe.picId ? recipe.picId : 'https://placekitten.com/200/200'
            "
          />
        </v-col>
        <v-col cols="8">
          <v-card-title>{{ recipe.name }}</v-card-title>
          {{ description }}
          <v-spacer></v-spacer>
          <v-rating
            readonly
            density="compact"
            v-model="recipe.avgRating"
          ></v-rating>
          <p>({{ recipe.reviewCount }})</p>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["recipeProp"],
  computed: {
    recipe() {
      return this.recipeProp;
    },
    description() {
      return (
        this.recipe.description.substring(
          0,
          Math.min(250, this.recipe.description.length)
        ) + "..."
      );
    },
  },
  methods: {
    gotoRecipePage(id) {
      this.$router.push("/recipe/" + id);
    },
  },
};
</script>

<style>
.recipe-card {
  padding: 5px;
}

.recipe-card:hover {
  cursor: pointer;
}

.img-fluid {
  max-width: 200px;
}
</style>
