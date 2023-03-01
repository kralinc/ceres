<template>
  <v-col cols="6" lg="4" xl="2">
    <v-card variant="tonal">
      <v-card-title>{{ pantryItem.foodItem.description }}</v-card-title>
      <v-row>
        <v-col cols="12" sm="9">
          <v-text-field
            :name="'quantity' + pantryItem.id"
            type="number"
            v-model="itemQuantity"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex">
          <label :for="'quantity' + pantryItem.id">{{ pantryItem.unit }}</label>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    pantryItem: Object,
  },
  computed: {
    itemQuantity() {
      return this.pantryItem.quantity;
    },
  },
};
</script>
