<template>
  <AddFoodItemDialog
    v-model="dialog"
    @send-cart="addFoodItemsToTable"
  ></AddFoodItemDialog>
</template>
<script>
import AddFoodItemDialog from "../AddFoodItemDialog.vue";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  props: ["openTrigger"],
  watch: {
    openTrigger() {
      this.dialog = true;
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  emits: ["updateTable"],
  methods: {
    open() {
      this.dialog = true;
    },
    addFoodItemsToTable(cart) {
      let table = {};
      for (let itemId in cart) {
        const item = cart[itemId];
        table[itemId] = {
          foodItemId: item.id,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitType: item.unitType,
        };
      }

      this.$emit("updateTable", table);
    },
  },
  components: { AddFoodItemDialog },
};
</script>
