<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        id="search-box"
        label="Filter Pantry"
        prepend-inner-icon="mdi-magnify"
        clearable
        variant="solo"
        @click:clear="onClear"
        @input="filterPantry"
        v-model="searchValue"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn prepend-icon="mdi-plus" @click="searchDialog = true"
        >Add Items</v-btn
      >
    </v-col>
  </v-row>
  <v-row>
    <template
      v-for="pantryItem of visiblePantryItems"
      v-bind:key="pantryItem.id"
    >
      <PantryCard
        v-bind:pantryItem="pantryItem"
        @click="showDialogWithItem(pantryItem)"
      ></PantryCard>
    </template>
  </v-row>
  <PantryItemDialog
    v-model="itemDialog"
    v-bind:dialogItem="itemDialogItem"
  ></PantryItemDialog>
  <AddToPantryDialog v-model="searchDialog"></AddToPantryDialog>
</template>
<script>
import PantryCard from "@/components/PantryCard.vue";
import PantryItemDialog from "@/components/pantrydialogs/PantryItemDialog.vue";
import AddToPantryDialog from "@/components/pantrydialogs/AddToPantryDialog.vue";
export default {
  name: "PantryView",
  data() {
    return {
      pantryItems: [
        {
          id: 1,
          foodItem: { id: 1, description: "Carrots", reusable: true },
          quantity: 7,
          unit: "Yuan Renminbi",
        },
        {
          id: 2,
          foodItem: { id: 2, description: "Beef", reusable: false },
          quantity: 3,
          unit: "Ruble",
        },
        {
          id: 3,
          foodItem: { id: 3, description: "Whey Protein", reusable: true },
          quantity: 10,
          unit: "Krona",
        },
        {
          id: 4,
          foodItem: { id: 4, description: "Tofu", reusable: true },
          quantity: 5,
          unit: "Euro",
        },
        {
          id: 5,
          foodItem: { id: 5, description: "Rice", reusable: true },
          quantity: 4,
          unit: "Naira",
        },
        {
          id: 6,
          foodItem: { id: 6, description: "Arsenic", reusable: false },
          quantity: 4,
          unit: "Ruble",
        },
      ],
      visiblePantryItems: [],
      searchValue: "",
      itemDialog: false,
      itemDialogItem: {},
      searchDialog: false,
    };
  },
  methods: {
    onClear() {
      console.log("sus");
    },
    filterPantry() {
      this.visiblePantryItems = this.pantryItems.filter((item) =>
        item.foodItem.description
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      );
    },
    showDialogWithItem(pantryItem) {
      this.itemDialogItem = pantryItem;
      this.itemDialog = true;
    },
  },
  mounted() {
    this.visiblePantryItems = this.pantryItems;
  },
  components: {
    PantryCard,
    PantryItemDialog,
    AddToPantryDialog,
  },
};
</script>
