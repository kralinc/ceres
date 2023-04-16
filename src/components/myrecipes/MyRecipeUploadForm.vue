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
        >Add Item</v-btn
      >

      <v-table v-if="ingredientTable.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ingredient in ingredientTable"
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
            <td>{{ ingredient.unit }}</td>
            <td>
              <v-btn
                color="red"
                @click="removeIngredient(ingredient)"
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
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { postReq } from "@/util/util.js";
import AddToMyRecipeDialog from "@/components/myrecipes/AddToMyRecipeDialog.vue";

export default {
  data() {
    return {
      showPassLogin: true,
      recipeName: "",
      description: "",
      ingredientTable: [],
      searchDialog: false,
      nameRules: [(v) => v.length <= 255 || "Max 255 characters"],
      descRules: [(v) => v.length <= 2048 || "Max 2048 characters"],
    };
  },
  methods: {
    updateTable(table) {
      //todo remove duplicates
      this.ingredientTable = this.ingredientTable.concat(table);
    },
    async uploadRecipe() {
      let recipe = {
        recipeName: this.recipeName,
        recipeDescription: this.description,
        ingredients: this.ingredientTable,
      };

      await postReq("v1/api/recipes/uploadPersonalRecipe", recipe, {
        200: "Successfully uploaded recipe!",
        err: "Could not upload the recipe",
        403: "You need to be logged in to upload a recipe",
      });

      //to do route on success
    },
    removeIngredient(ingredient) {
      this.ingredientTable = this.ingredientTable.filter(
        (x) => x.foodItemId != ingredient.foodItemId
      );
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
  components: {
    AddToMyRecipeDialog,
  },
};
</script>
