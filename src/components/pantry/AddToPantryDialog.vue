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
        <v-btn variant="text" @click="$emit('update:modelValue', false)">
          Add
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-row class="d-flex align-start">
        <v-col>
          <v-text-field
            v-model="searchValue"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            @input="filterFoodItems"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-list lines="1">
            <v-list-item
              v-for="item in cart"
              v-bind:key="item.id"
              :title="item.name"
              :subtitle="item.description"
            >
            </v-list-item>
          </v-list>
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
import FoodItemSearchCard from "./FoodItemSearchCard.vue";
import { useDisplay } from "vuetify";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
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
      this.cart[foodItem.id] = foodItem;
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
