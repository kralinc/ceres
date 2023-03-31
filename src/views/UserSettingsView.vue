<template>
  <v-row>
    <v-col class="d-flex justify-center">
      <h1>Settings</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>User Info</h3>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field
        variant="outlined"
        label="First Name"
        v-model="userInfo.firstName"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field
        variant="outlined"
        label="Last Name"
        v-model="userInfo.lastName"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn prepend-icon="mdi-content-save" @click="updateUserInfo"
        >Save</v-btn
      >
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>Display</h3>
      <div class="text-subtitle-1 text-medium-emphasis">Unit Type</div>
      <v-select
        label="Choose a Unit Type"
        :items="unitTypes"
        v-model="selectedUnit"
      ></v-select>
      <v-btn prepend-icon="mdi-content-save" @click="updateUnitPreference"
        >Save</v-btn
      >
    </v-col>
    <v-divider></v-divider>
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
            <td>{{ ingredient.description }}</td>
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
  </v-row>
</template>
<script>
import { getReq, postReq } from "@/util/util";
export default {
  name: "UserSettingsView",
  data() {
    return {
      userInfo: {},
      dislikedIngredients: {},
      allFoodItems: [],
      selectedDislikedIngredients: [],
      unitTypes: ["Metric", "Imperial"],
      selectedUnit: "",
      currentUnit: "",
    };
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
    async updateUserInfo() {
      const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.userInfo.firstName !== currentUserInfo.firstName) {
        await this.updateName(this.userInfo.firstName, "first", {
          200: "Succesfully updated name!",
        });
      }
      if (this.userInfo.lastName !== currentUserInfo.lastName) {
        await this.updateName(this.userInfo.lastName, "last", {
          200: "Succesfully updated name!",
        });
      }
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    async updateName(newName, nameIndicator) {
      let nameObject = { newName: newName, nameIndicator: nameIndicator };
      return await postReq("v1/api/user/updateName", nameObject);
    },
    async updateUnitPreference() {
      if (this.currentUnit !== this.selectedUnit) {
        await postReq(
          "v1/api/user/setUserPreferences",
          { fieldToUpdate: "unit" },
          { 200: "Successfully updated unit preference!" }
        );
        this.currentUnit = this.selectedUnit;
      }
    },
  },
  async mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.allFoodItems = await getReq("v1/api/food", {
      err: "Something went wrong while fetching the food items.",
    });
    const dislikedIngredients = await postReq(
      "v1/api/inventory/getDislikedItems",
      {},
      { err: "Something went wrong while fetching your disliked items." }
    );
    dislikedIngredients.forEach((ingredient) => {
      this.dislikedIngredients[ingredient.foodItem.id] = ingredient.foodItem;
    });
    this.allFoodItems = this.allFoodItems.filter(
      (item) => !Object.hasOwn(this.dislikedIngredients, item.id)
    );

    const userPreferences = await postReq("v1/api/user/getUserPreferences");

    this.currentUnit = this.selectedUnit = userPreferences.metric
      ? "Metric"
      : "Imperial";
  },
};
</script>
