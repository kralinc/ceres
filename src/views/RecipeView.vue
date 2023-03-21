<template>
  <!-- <div>Recipe Object: {{ recipe }}</div>
  <div>Recipe Items: {{ itemsList }}</div> -->
  <v-row>
    <v-col cols="12">
      <v-card>
        <h1 class="text-h1 py-5">{{ recipe.name }}</h1>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="12" lg="5">
      <v-card>
        <div>
          <v-img
            cover
            :src="
              recipe.image ? recipe.image : 'https://placekitten.com/200/200'
            "
          >
          </v-img>
        </div>
        <div class="mt-5">
          <v-row>
            <v-col sm="12" lg="6">
              <v-text> Cook Time: {{ recipe.cookTime }} </v-text>
            </v-col>
            <v-col sm="12" lg="6">
              <v-btn> Rate this Recipe ({{ reviewCount }}) </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-5"></v-divider>
          <v-row>
            <v-col>
              <v-rating
                readonly
                size="x-large"
                v-model="recipe.rating"
                color="black"
                active-color="yellow-accent-4"
              ></v-rating>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col sm="12" lg="7">
      <v-row>
        <v-col>{{ recipe.description }}</v-col>
        <v-divider></v-divider>
      </v-row>
      <v-row>
        <v-col>
          <span class="text-h5">Ingredients</span>
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Ingredient</th>
                <th class="text-center">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in itemsList" :key="item.id">
                <td>{{ item.foodItem.name }}</td>
                <td>{{ item.quantity }} {{ item.measurementUnit }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-divider class="ma-5"></v-divider>
  <v-row>
    <v-col lg="12"> Reviews </v-col>
  </v-row>
  <v-row>
    <v-col lg="5">
      <v-card>
        <v-row>
          <v-col lg="12" class="mt-3">
            <strong>{{ recipe.name }} Reviews </strong></v-col
          >
          <v-divider></v-divider>
          <v-col
            ><v-rating
              readonly
              size="x-large"
              v-model="recipe.rating"
              color="black"
              active-color="yellow-accent-4"
            ></v-rating
          ></v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col lg="7" v-for="review in reviews" :key="review.id">
      <v-card>
        <div>
          {{ review.user.username }}
          <v-card>
            {{ review.review }}
          </v-card>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { getReq } from "@/util/util.js";

export default {
  name: "RecipeView",
  mounted() {
    this.loadRecipe(this.$route.params.id);
    this.loadRecipeItems(this.$route.params.id);
    // this.loadReviews(this.$route.params.id);
  },
  data() {
    return {
      recipeId: -1,
      recipe: Object,
      itemsList: [],
      reviews: [],
    };
  },
  computed: {
    ...mapStores(useMainStore),
    reviewCount() {
      return this.recipe.reviewCount ? this.recipe.reviewCount : 0;
    },
  },
  methods: {
    async loadRecipe(id) {
      this.recipe = await getReq(
        "v1/api/recipes/getRecipe?id=" + id,
        { err: "There was a problem loading the recipe!" }
        // this.showLoadRecipeError
      );
    },
    async loadRecipeItems(id) {
      this.itemsList = await getReq(
        "v1/api/recipes/getRecipeItems?id=" + id,
        { err: "There was a problem loading the recipe items!" }
        // this.showLoadRecipeItemsError
      );
    },
    async loadReviews(id) {
      this.reviews = await getReq("v1/api/recipes/getRecipeReviews?id=" + id, {
        err: "There was a problem loading reviews!",
      });
    },

    // showLoadRecipeError() {
    //   this.mainStore.setSnackbar("There was a problem loading the recipe!");
    // },
    // showLoadRecipeItemsError() {
    //   this.mainStore.setSnackbar(
    //     "There was a problem loading the recipe items!"
    //   );
    // },
  },
};
</script>
