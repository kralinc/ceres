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
      <v-btn prepend-icon="mdi-plus">Add Items</v-btn>
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
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    :fullscreen="smAndDown"
  >
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ dialogItem.foodItem.description }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="dialog = false"> Save </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-row>
        <v-col cols="12" md="3">
          <v-img :src="'https://placekitten.com/600/450'"></v-img>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            type="number"
            v-model="dialogItem.quantity"
          ></v-text-field>
          <p>{{ dialogItem.unit }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { useDisplay } from "vuetify";
import PantryCard from "@/components/PantryCard.vue";
export default {
  name: "PantryView",
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
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
      dialog: false,
      dialogItem: {},
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
      this.dialogItem = pantryItem;
      this.dialog = true;
    },
  },
  mounted() {
    this.visiblePantryItems = this.pantryItems;
  },
  components: {
    PantryCard,
  },
};
</script>
