<template>
  <v-dialog
    :model-value="modelValue"
    @click:outside="$emit('update:modelValue', false)"
    persistent
    no-click-animation
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Food Item Search</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="addFoodItemToTable"> Add </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-row align-content="start">
        <v-col cols="12">
          <v-text-field
            v-model="searchValue"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            @input="filterFoodItems"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-table>
            <tr v-for="item in cart" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <v-text-field
                  type="number"
                  v-model="item.quantity"
                ></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.unit"></v-text-field>
              </td>
            </tr>
          </v-table>
        </v-col>
        <template v-for="foodItem of visibleFoodItems" v-bind:key="foodItem.id">
          <v-col cols="12" lg="6">
            <FoodItemSearchCard
              v-bind:item="foodItem"
              @click="addFoodItemToCart(foodItem)"
            ></FoodItemSearchCard>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import FoodItemSearchCard from "@/components/pantry/FoodItemSearchCard.vue";
import { useDisplay } from "vuetify";
import { getReq } from "@/util/util";

export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  async mounted() {
    this.loadFoodItems();
  },
  props: ["modelValue"],
  emits: ["update:modelValue", "updateTable"],
  data() {
    return {
      searchValue: "",
      searchCounter: 0,
      foodItems: [],
      visibleFoodItems: [],
      cart: {},
    };
  },
  methods: {
    async loadFoodItems() {
      this.visibleFoodItems = this.foodItems = await getReq("v1/api/food", {
        err: "Something went wrong while fetching the food items.",
      });
    },
    filterFoodItems() {
      this.visibleFoodItems = this.foodItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchValue)
      );
    },
    addFoodItemToCart(foodItem) {
      if (!this.cart[foodItem.id]) {
        foodItem.unit = "cup";
        foodItem.quantity = 1;
        this.cart[foodItem.id] = foodItem;
      }
    },
    addFoodItemToTable() {
      let table = [];
      for (let itemId in this.cart) {
        const item = this.cart[itemId];
        table.push({
          foodItemId: item.id,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
        });
      }

      this.cart = {};

      this.$emit("updateTable", table);
      this.$emit("update:modelValue", false);
    },
    closeDialog() {
      this.cart = {};
      this.$emit("update:modelValue", false);
    },
  },
  components: {
    FoodItemSearchCard,
  },
};
</script>
