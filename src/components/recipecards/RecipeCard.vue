<template>
  <v-col
    cols="12"
    lg="6"
    v-if="cardType === 'list'"
    @click="gotoRecipePage(recipe.id)"
  >
    <v-card variant="tonal" class="recipe-card">
      <v-row>
        <v-col cols="4" class="d-flex">
          <v-img
            class="img-fluid"
            :src="
              recipe.image ? recipe.image : 'https://placekitten.com/200/200'
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
            v-model="recipe.rating"
          ></v-rating>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
  <v-col cols="12" sm="4" lg="3" xl="2" v-if="cardType === 'grid'">
    <v-card variant="tonal" class="recipe-card"> </v-card>
  </v-col>
  <v-col cols="12" v-if="cardType === 'listcomp'">
    <v-card variant="tonal" class="recipe-card text-truncate">
      <v-card-title>{{ recipe.name }}</v-card-title>
      {{ description }}
      <v-rating readonly density="compact" v-model="recipe.rating"></v-rating>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    recipeProp: Object,
    cardType: String,
  },
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

.img-fluid {
  max-width: 200px;
}
</style>
