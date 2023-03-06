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
      <v-btn icon dark @click="$emit('update:modelValue', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Food Item Search</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="saveFoodItemsToPantry"> Add </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-row class="d-flex align-start">
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
          <v-col cols="12" lg="6" class="d-inline">
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
import FoodItemSearchCard from "./FoodItemSearchCard.vue";
import { useDisplay } from "vuetify";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
import { getReq, postReq } from "@/util/util";
export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  async mounted() {
    this.loadFoodItems();
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
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
      this.visibleFoodItems = this.foodItems = await getReq(
        "v1/api/food",
        this.getFoodItemsFailedToast
      );
    },
    filterFoodItems() {
      this.visibleFoodItems = this.foodItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchValue)
      );
    },
    getFoodItemsFailedToast() {
      this.mainStore.setSnackbar(
        "Something went wrong while fetching the food items."
      );
    },
    addFoodItemToCart(foodItem) {
      if (!this.cart[foodItem.id]) {
        foodItem.unit = "cup";
        foodItem.quantity = 1;
        this.cart[foodItem.id] = foodItem;
      }
    },
    async saveFoodItemsToPantry() {
      let pantry = [];
      for (let itemId in this.cart) {
        const item = this.cart[itemId];
        let updateInventory = {
          foodId: item.id,
          quantity: item.quantity,
          unit: item.unit,
        };

        pantry = await postReq(
          "v1/api/inventory/updateInventory",
          updateInventory,
          this.showFailedInventorySnackbar
        );
      }
      this.$emit("updatePantry", pantry);
      this.$emit("update:modelValue", false);
    },
    showFailedInventorySnackbar() {
      this.mainStore.setSnackbar("Could not update inventory!");
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
  components: {
    FoodItemSearchCard,
  },
};
</script>
