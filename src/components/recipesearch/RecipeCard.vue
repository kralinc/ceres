<template>
  <v-col cols="12" lg="6" @click="gotoRecipePage(recipe)">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        variant="tonal"
        class="recipe-card"
        v-bind="props"
        :elevation="isHovering ? 16 : 0"
      >
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
            <v-row v-if="recipe.isPublic">
              <v-col cols="7" class="d-flex align-center">
                <v-rating
                  class="ml-auto"
                  readonly
                  density="compact"
                  v-model="recipe.avgRating"
                ></v-rating>
              </v-col>
              <v-col cols="5" class="d-flex align-center">
                <p class="mr-auto">({{ recipe.reviewCount }})</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
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
          Math.min(247, this.recipe.description.length)
        ) + "..."
      );
    },
  },
  methods: {
    gotoRecipePage(recipe) {
      this.$router.push({
        path: "/recipe/" + recipe.id,
        query: { toSub: recipe.foodIdToReplace, sub: recipe.subbedId },
      });
    },
  },
};
</script>

<style>
.recipe-card {
  padding: 5px !important;
}

.recipe-card:hover {
  cursor: pointer;
}

.img-fluid {
  max-width: 200px;
}
</style>
