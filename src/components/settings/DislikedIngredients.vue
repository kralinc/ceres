<template>
  <v-col cols="12">
    <h3>Allergies/Dislikes</h3>
    <v-combobox
      label="Add Items"
      :items="allFoodItems"
      v-model="selectedDislikedIngredients"
      item-title="name"
      return-object
      multiple
      chips
    ></v-combobox>
    <v-btn @click="addDislikedIngredients" prepend-icon="mdi-plus">Add</v-btn>
    <v-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in dislikedIngredients" :key="ingredient.id">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.description.substring(0, 100) }}</td>
          <td>
            <v-btn
              color="red"
              @click="removeDislikedIngredient(ingredient)"
              icon="mdi-trash-can"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<script>
import { postReq } from "@/util/util.js";
export default {
  props: ["allFoodItemsProp"],
  data() {
    return {
      dislikedIngredients: {},
      allFoodItems: [],
      selectedDislikedIngredients: [],
    };
  },
  watch: {
    allFoodItemsProp() {
      this.allFoodItems = this.allFoodItemsProp.filter(
        (item) => !Object.hasOwn(this.dislikedIngredients, item.id)
      );
    },
  },
  methods: {
    async addDislikedIngredients() {
      for (const ingredient of this.selectedDislikedIngredients) {
        await postReq("v1/api/inventory/addDislikedItem", ingredient.id, {
          200: "Succesfully updated preferences!",
          err: "There was an error while setting your disliked ingredients",
        });
      }
      this.selectedDislikedIngredients.forEach((ingredient) => {
        this.dislikedIngredients[ingredient.id] = ingredient;

        for (let i = 0; i < this.allFoodItems.length; i++) {
          if (this.allFoodItems[i].id === ingredient.id) {
            this.allFoodItems.splice(i, 1);
            break;
          }
        }
      });
      this.selectedDislikedIngredients = [];
    },
    async removeDislikedIngredient(ingredient) {
      await postReq("v1/api/inventory/removeDislikedItem", ingredient.id, {
        200: "Succesfully updated preferences!",
        err: "There was an error while setting your disliked ingredients",
      });
      delete this.dislikedIngredients[ingredient.id];
      this.allFoodItems.push(ingredient);
    },
  },
  async mounted() {
    const dislikedIngredientsRaw = await postReq(
      "v1/api/inventory/getDislikedItems",
      {},
      { err: "Something went wrong while fetching your disliked items." }
    );
    if (typeof dislikedIngredientsRaw === "object") {
      dislikedIngredientsRaw.forEach((ingredient) => {
        this.dislikedIngredients[ingredient.foodItem.id] = ingredient.foodItem;
      });
    }
  },
};
</script>
