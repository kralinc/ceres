<template>
  <v-col cols="12">
    <h3>Minor Ingredients</h3>
    <v-combobox
      label="Add Items"
      :items="allFoodItems"
      v-model="selectedMinorIngredients"
      item-title="name"
      return-object
      multiple
      chips
    ></v-combobox>
    <v-btn @click="addMinorIngredients" prepend-icon="mdi-plus">Add</v-btn>
    <v-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in minorIngredients" :key="ingredient.id">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.description }}</td>
          <td>
            <v-btn
              color="orange"
              @click="removeMinorIngredient(ingredient)"
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
      minorIngredients: {},
      allFoodItems: [],
      selectedMinorIngredients: [],
    };
  },
  methods: {
    async addMinorIngredients() {
      for (const ingredient of this.selectedMinorIngredients) {
        await postReq(
          "v1/api/inventory/markItem",
          { itemId: ingredient.id, command: "add" },
          {
            200: "Succesfully updated preferences!",
            err: "There was an error while setting your Minor ingredients",
          }
        );
      }
      this.selectedMinorIngredients.forEach((ingredient) => {
        this.minorIngredients[ingredient.id] = ingredient;

        for (let i = 0; i < this.allFoodItems.length; i++) {
          if (this.allFoodItems[i].id === ingredient.id) {
            this.allFoodItems.splice(i, 1);
            break;
          }
        }
      });
      this.selectedMinorIngredients = [];
    },
    async removeMinorIngredient(ingredient) {
      await postReq(
        "v1/api/inventory/markItem",
        { itemId: ingredient.id, command: "remove" },
        {
          200: "Succesfully updated preferences!",
          err: "There was an error while setting your Minor ingredients",
        }
      );
      delete this.minorIngredients[ingredient.id];
      this.allFoodItems.push(ingredient);
    },
  },
  async mounted() {
    const minorIngredientsRaw = await postReq(
      "v1/api/inventory/getMinorItems",
      {},
      { err: "Something went wrong while fetching your Minor items." }
    );
    if (typeof minorIngredientsRaw === "object") {
      minorIngredientsRaw.forEach((ingredient) => {
        this.minorIngredients[ingredient.foodItem.id] = ingredient.foodItem;
      });
    }
    this.allFoodItems = this.allFoodItemsProp.filter(
      (item) => !Object.hasOwn(this.minorIngredients, item.id)
    );
  },
};
</script>
