<template>
  <v-col v-for="recipe of recipes" :key="recipe.id" cols="12">
    <v-card variant="tonal" class="recipe-card text-truncate">
      <v-card-title>{{ recipe.name }}</v-card-title>
      {{ recipe.description }}
      <v-spacer></v-spacer>
      <v-rating readonly density="compact" v-model="recipe.rating"></v-rating>
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
      recipes: [
        {
          id: 1,
          name: "Saxifraga nelsoniana D. Don ssp. carlottae (Calder & Savile) Hultén",
          description:
            "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
          rating: 4,
        },
        {
          id: 2,
          name: "Dicranella schreberiana (Hedw.) Hilf. ex H.A. Crum & L.E. Anderson",
          description:
            "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
          rating: 1,
        },
        {
          id: 3,
          name: "Xanthoria elegans (Link) Th. Fr. var. splendens (Darbish.) M.S. Christ. ex Poelt",
          description:
            "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
          rating: 2,
        },
        {
          id: 4,
          name: "Relicina eximbricata (Gyel.) Hale",
          description:
            "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
          rating: 5,
        },
        {
          id: 5,
          name: "Polytrichum commune Hedw. var. perigoniale (Michx.) Hampe",
          description:
            "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          rating: 2,
        },
        {
          id: 6,
          name: "Croptilon Raf.",
          description:
            "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
          rating: 5,
        },
        {
          id: 7,
          name: "Lotus procumbens (Greene) Greene var. procumbens",
          description:
            "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
          rating: 5,
        },
      ],
    };
  },
};
</script>

<style>
.recipe-card {
  max-height: 200px;
  padding: 5px;
}
</style>
