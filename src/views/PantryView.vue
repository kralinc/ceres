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
    @update-pantry="updatePantry"
  ></PantryItemDialog>
  <AddToPantryDialog
    v-model="searchDialog"
    @update-pantry="updatePantry"
  ></AddToPantryDialog>
</template>
<script>
import PantryCard from "@/components/pantry/PantryCard.vue";
import PantryItemDialog from "@/components/pantry/PantryItemDialog.vue";
import AddToPantryDialog from "@/components/pantry/AddToPantryDialog.vue";
import { postReq } from "@/util/util";
export default {
  name: "PantryView",
  data() {
    return {
      pantryItems: [],
      visiblePantryItems: [],
      searchValue: "",
      itemDialog: false,
      itemDialogItem: {},
      searchDialog: false,
    };
  },
  async mounted() {
    this.pantryItems = await postReq("v1/api/inventory/getInventory", {});
    this.visiblePantryItems = this.pantryItems;
  },
  methods: {
    onClear() {
      this.searchValue = "";
      this.filterPantry();
    },
    filterPantry() {
      this.visiblePantryItems = this.pantryItems.filter((item) =>
        item.foodId.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
    showDialogWithItem(pantryItem) {
      this.itemDialogItem = pantryItem;
      this.itemDialog = true;
    },
    updatePantry(pantry) {
      this.visiblePantryItems = this.pantryItems = pantry;
    },
  },
  components: {
    PantryCard,
    PantryItemDialog,
    AddToPantryDialog,
  },
};
</script>
