<template>
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
              recipe.picId ? recipe.picId : 'https://placekitten.com/200/200'
            "
          >
          </v-img>
        </div>
        <div class="mt-5">
          <v-row>
            <v-col>
              <v-rating
                readonly
                size="x-large"
                v-model="recipe.avgRating"
                color="black"
                active-color="yellow-accent-4"
              ></v-rating>
            </v-col>
          </v-row>
          <v-divider class="mb-3"></v-divider>
        </div>
      </v-card>
    </v-col>
    <v-col sm="12" lg="7">
      <v-row>
        <v-col>
          <ol>
            <li
              v-for="descriptor in recipe.description"
              :key="descriptor"
              class="ml-4 pa-2 text-left text-h5"
            >
              {{ descriptor }}
            </li>
          </ol>
        </v-col>
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
                <td>
                  {{ parseFloat(item.quantity.toFixed(3)) }}
                  {{ item.measurementUnit }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <template v-if="token">
    <v-divider class="ma-5"></v-divider>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog[0]" persistent width="1024">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              variant="outlined"
              @click="loadCompleteList()"
            >
              Complete Recipe
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Ingredients</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Ingredient</th>
                      <th class="text-left">Amount in Pantry</th>
                      <th class="text-left">Amount Used</th>
                      <th class="text-left">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in completeList" :key="item.id">
                      <td>{{ item.foodItem.name }}</td>
                      <template v-if="item.pantryCount">
                        <td>
                          {{ parseFloat(item.pantryCount.toFixed(3)) }}
                          {{ item.pantryUnit }}
                        </td>
                      </template>
                      <template v-else> <td>NONE IN PANTRY</td> </template>
                      <td>
                        <v-text-field
                          v-model="item.quantityRounded"
                          hide-details
                          single-line
                          type="number"
                          clearable
                        ></v-text-field>
                      </td>
                      <template v-if="unitSystem.metric">
                        <td>
                          <v-select
                            v-model="item.measurementUnit"
                            :items="metricUnits"
                            single-line
                            hide-details
                          ></v-select>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <v-select
                            v-model="item.measurementUnit"
                            :items="imperialUnits"
                            single-line
                            hide-details
                          ></v-select>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </v-table>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog[0] = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                :disabled="completeFlag"
                @click="completeRecipe()"
              >
                Complete Recipe
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
  <v-divider class="ma-5"></v-divider>
  <v-row>
    <v-col lg="12"> Reviews </v-col>
  </v-row>
  <v-row>
    <v-col lg="4">
      <v-card>
        <v-card-title>
          <div>
            <v-row no-gutters>
              <v-col lg="12" class="text-left">
                <strong>Customer Reviews</strong>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="text-left ml-1">
                <v-rating
                  readonly
                  v-model="recipe.avgRating"
                  color="black"
                  active-color="yellow-accent-4"
                  size="medium"
                ></v-rating>
                <span class="text-grey-lighten-2 text-caption me-2">
                  ({{ recipe.avgRating }})
                </span>
              </v-col>
            </v-row>
          </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-row no-gutters>
            <v-col cols="12" class="ma-0 pa-0">
              <v-checkbox
                v-model="renderReviews"
                label="5 Stars"
                density="compact"
                value="5"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0">
              <v-checkbox
                v-model="renderReviews"
                label="4 Stars"
                density="compact"
                value="4"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0">
              <v-checkbox
                v-model="renderReviews"
                label="3 Stars"
                density="compact"
                value="3"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0">
              <v-checkbox
                v-model="renderReviews"
                label="2 Stars"
                density="compact"
                value="2"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="ma-0 pa-0">
              <v-checkbox
                v-model="renderReviews"
                label="1 Stars"
                density="compact"
                value="1"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-dialog v-model="dialog[1]" persistent width="1024">
                <template v-slot:activator="{ props }">
                  <v-btn color="primary" v-bind="props" variant="outlined">
                    Rate This Recipe
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Recipe Review</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="[1, 2, 3, 4, 5]"
                            label="Rating*"
                            v-model="newReview.stars"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Description"
                            v-model="newReview.review"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="dialog[1] = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="uploadReview()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col lg="8">
      <div v-for="review in reviews" :key="review.id" class="mb-5">
        <v-card v-if="review.show">
          <div class="ma-1">
            <div class="mx-3">
              <v-card-actions>
                <a>{{ review.user.username }}</a>

                <v-spacer></v-spacer>

                <span class="text-grey-lighten-2 text-caption me-2">
                  ({{ review.stars }})
                </span>

                <v-rating
                  readonly
                  v-model="review.stars"
                  color="black"
                  active-color="yellow-accent-4"
                  size="25"
                ></v-rating>
              </v-card-actions>
            </div>
            <v-divider class="ma-3"></v-divider>
            <v-card-text class="text-left">
              {{ review.review }}
            </v-card-text>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { getReq, postReq } from "@/util/util.js";

export default {
  name: "RecipeView",
  async mounted() {
    this.loadRecipe(this.$route.params.id);
    this.loadRecipeItems(this.$route.params.id);
    this.loadReviews(this.$route.params.id);
    if (this.token) {
      this.pantryItems = await postReq("v1/api/inventory/getInventory", {});
      this.getUnitSystem();
    }
    this.visiblePantryItems = this.pantryItems;
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      recipeId: -1,
      recipe: Object,
      itemsList: [],
      completeFlag: false,
      reviews: [],
      renderReviews: [],
      dialog: [false, false],
      recipeComplete: false,
      newReview: {},
      pantryItems: [],
      visiblePantryItems: [],
      completeList: [],
      unitSystem: "",
      metricUnits: [
        "Meter",
        "Piece",
        "Celsius",
        "Milliliter",
        "Liter",
        "Milligram",
        "Gram",
        "Kilogram",
      ],
      imperialUnits: [
        "Inches",
        "Feet",
        "Yard",
        "Slices",
        "Fahrenheit",
        "Teaspoon",
        "Tablespoon",
        "Cup",
        "Gallon",
        "Ounce",
        "Pound",
      ],
    };
  },
  watch: {
    renderReviews() {
      if (this.renderReviews.length > 0) {
        this.reviews.forEach((review) => {
          if (this.renderReviews.includes(review.stars.toString())) {
            review.show = true;
          } else {
            review.show = false;
          }
        });
      } else {
        this.reviews.forEach((review) => {
          review.show = true;
        });
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
    reviewCount() {
      return this.recipe.reviewCount ? this.recipe.reviewCount : 0;
    },
  },
  methods: {
    async getUnitSystem() {
      this.unitSystem = await postReq("v1/api/user/getUserPreferences", {
        err: "There was a problem loading user preferences!",
      });
    },
    async loadRecipe(id) {
      this.recipe = await getReq("v1/api/recipes/getRecipe?id=" + id, {
        err: "There was a problem loading the recipe!",
      });
      this.recipe.description = this.recipe.description.split("\n");
    },
    async loadRecipeItems(id) {
      this.itemsList = await getReq("v1/api/recipes/getRecipeItems?id=" + id, {
        err: "There was a problem loading the recipe items!",
      });
    },
    async loadReviews(id) {
      this.reviews = await getReq("v1/api/recipes/getRecipeReviews?id=" + id, {
        err: "There was a problem loading reviews!",
      });
      this.reviews.forEach((review) => {
        review.show = true;
      });
    },
    async uploadReview() {
      const uploadReview = {
        stars: this.newReview.stars,
        review: this.newReview.review,
        recipeId: this.$route.params.id,
      };
      const review = await postReq("v1/api/recipes/addReview", uploadReview, {
        200: "Review Successfully Added!",
        err: "Could not update reviews.",
        403: "You need to be logged in to add a review.",
      });
      if (review) {
        console.log(review);
      }
      this.dialog[1] = false;
    },
    loadCompleteList() {
      this.completeList = this.itemsList;
      this.completeList.forEach((item) => {
        this.pantryItems.forEach((pantryItem) => {
          if (pantryItem.foodId.id == item.foodItem.id) {
            item.pantryCount = pantryItem.quantity;
            item.pantryUnit = pantryItem.unit;
          }
        });
        if (!item.pantryCount) {
          this.completeFlag = true;
        }
        item.quantityRounded = parseFloat(item.quantity.toFixed(3));
      });
    },
    async completeRecipe() {
      this.completeList.forEach((item) => {
        this.removeItem(item);
      });
      this.pantryItems = await postReq("v1/api/inventory/getInventory", {});
      this.dialog[0] = false;
    },
    async removeItem(item) {
      let submitQuantity = 0;
      if (parseInt(item.quantity.toFixed(3)) == item.quantityRounded) {
        submitQuantity = item.quantity;
      } else {
        submitQuantity = item.quantityRounded;
      }
      const updateInventory = {
        foodId: item.foodItem.id,
        quantity: parseInt(submitQuantity) * -1,
        unit: item.measurementUnit,
      };
      await postReq("v1/api/inventory/updateInventory", updateInventory, {
        200: "Succesfully removed items from pantry!",
        err: "Could not update pantry.",
        403: "You need to be logged in to update the pantry.",
      });
    },
  },
};
</script>
