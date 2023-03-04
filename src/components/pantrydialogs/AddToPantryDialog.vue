<template>
  <v-dialog
    :model-value="modelValue"
    @click:outside="$emit('update:modelValue', false)"
    persistent
    no-click-animation
    transition="dialog-bottom-transition"
    :fullscreen="smAndDown"
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
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchValue"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            @input="filterFoodItems"
            @click="loadFoodItems"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          v-for="foodItem of visibleFoodItems"
          v-bind:key="foodItem.id"
        >
          <p>{{ foodItem.name }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { useDisplay } from "vuetify";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
import { getReq } from "@/util/util";
export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      searchValue: "",
      searchCounter: 0,
      foodItems: [],
      visibleFoodItems: [],
    };
  },
  methods: {
    async loadFoodItems() {
      this.foodItems = await getReq(
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
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
