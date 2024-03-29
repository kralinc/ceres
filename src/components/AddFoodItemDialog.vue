<template>
  <v-dialog
    :model-value="modelValue"
    @click:outside="$emit('update:modelValue', false)"
    persistent
    no-click-animation
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-toolbar color="green-darken-1">
      <v-btn icon @click="closeDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Food Item Search</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="saveFoodItems"> Add </v-btn>
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
                <v-select
                  v-model="item.unit"
                  :items="units[item.unitType]"
                ></v-select>
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
import {
  getReq,
  UNITS_IMPERIAL,
  UNITS_METRIC,
  userInfoUtil,
} from "@/util/util";

export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  async mounted() {
    this.units = userInfoUtil.getUserInfo().metric
      ? UNITS_METRIC
      : UNITS_IMPERIAL;
    this.loadFoodItems();
  },
  props: ["modelValue"],
  emits: ["sendCart", "update:modelValue"],
  data() {
    return {
      searchValue: "",
      searchCounter: 0,
      foodItems: [],
      visibleFoodItems: [],
      cart: {},
      units: [],
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
        foodItem.quantity = 1;
        foodItem.unit = this.units[foodItem.unitType][0];
        this.cart[foodItem.id] = foodItem;
      }
    },
    async saveFoodItems() {
      this.$emit("sendCart", this.cart);
      this.cart = {};
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
