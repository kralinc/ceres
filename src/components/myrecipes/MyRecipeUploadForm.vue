<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4"
      >Create a Personal Recipe</v-card-title
    >
    <v-form class="my-8">
      <v-text-field
        v-model="recipeName"
        label="Recipe Name"
        :rules="nameRules"
        counter
        maxlength="255"
        required
      ></v-text-field>

      <v-textarea
        v-model="description"
        label="Recipe Description"
        :rules="descRules"
        counter
        maxlength="2048"
      ></v-textarea>

      <v-btn
        block
        class="mx-auto mt-3"
        @click="() => (this.searchDialog = true)"
        prepend-icon="mdi-plus"
        >Add Item</v-btn
      >

      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ingredient in this.ingredientTable"
            :key="ingredient.foodItemId"
          >
            <td>{{ ingredient.name }}</td>
            <td>
              <v-text-field
                v-model="ingredient.quantity"
                single-line
                type="number"
              />
            </td>
            <td>
              <v-select
                v-model="ingredient.unit"
                :items="units[ingredient.unitType]"
              ></v-select>
            </td>
            <td>
              <v-btn
                color="red"
                @click="removeIngredient(ingredient.foodItemId)"
                icon="mdi-trash-can"
              ></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-btn block class="mx-auto mt-3" @click="uploadRecipe"
        >Create Recipe</v-btn
      >

      <div class="my-3">
        <router-link to="/myRecipes" class="router-link"> Back </router-link>
      </div>
    </v-form>
  </v-card>

  <AddToMyRecipeDialog v-model="searchDialog" @update-table="updateTable">
  </AddToMyRecipeDialog>
</template>

<script>
import {
  postReq,
  UNITS_IMPERIAL,
  UNITS_METRIC,
  userInfoUtil,
} from "@/util/util";
import AddToMyRecipeDialog from "@/components/myrecipes/AddToMyRecipeDialog.vue";

export default {
  data() {
    return {
      showPassLogin: true,
      recipeName: "",
      description: "",
      ingredientTable: {},
      units: [],
      searchDialog: false,
      nameRules: [(v) => v.length <= 255 || "Max 255 characters"],
      descRules: [(v) => v.length <= 2048 || "Max 2048 characters"],
    };
  },
  async mounted() {
    this.units = userInfoUtil.getUserInfo().metric
      ? UNITS_METRIC
      : UNITS_IMPERIAL;
  },
  methods: {
    updateTable(table) {
      for (let ingredient in table) {
        this.ingredientTable[ingredient] = table[ingredient];
      }
    },
    async uploadRecipe() {
      let ingredients = [];
      for (let item in this.ingredientTable) {
        ingredients.push(this.ingredientTable[item]);
      }

      if (ingredients.length <= 0) {
        this.mainStore.setSnackbar("You must include at least 1 ingredient.");
        return;
      }

      let recipe = {
        recipeName: this.recipeName,
        recipeDescription: this.description,
        ingredients: ingredients,
      };

      const recipeObject = await postReq(
        "v1/api/recipes/uploadPersonalRecipe",
        recipe,
        {
          200: "Successfully uploaded recipe!",
          err: "Could not upload the recipe",
          403: "You need to be logged in to upload a recipe",
        }
      );

      if (recipeObject) {
        this.$router.push("/myRecipes");
      }
    },
    removeIngredient(foodItemId) {
      delete this.ingredientTable[foodItemId];
    },
    async validate() {
      let results = await this.$refs.form.validate();

      if (results.valid) {
        this.uploadRecipe();
      }
    },
  },
  components: {
    AddToMyRecipeDialog,
  },
};
</script>
