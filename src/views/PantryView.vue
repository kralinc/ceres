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
    <!-- <PantryCard
      v-for="pantryItem of visiblePantryItems"
      v-bind:key="pantryItem.id"
      v-bind:pantryItem="pantryItem"
    ></PantryCard> -->
    <v-col cols="12">
      <v-table>
        <thead>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit</th>
        </thead>
        <tbody>
          <tr v-for="pantryItem of visiblePantryItems" :key="pantryItem.id">
            <td>{{ pantryItem.foodItem.description }}</td>
            <td>
              <v-text-field
                :name="'quantity' + pantryItem.id"
                type="number"
                v-model="pantryItem.quantity"
              ></v-text-field>
            </td>
            <td>{{ pantryItem.unit }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script>
// import PantryCard from "@/components/PantryCard.vue";
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
  },
  mounted() {
    this.visiblePantryItems = this.pantryItems;
  },
  components: {
    // PantryCard,
  },
};
</script>
