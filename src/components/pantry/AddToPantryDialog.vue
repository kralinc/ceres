<template>
  <AddFoodItemDialog
    v-model="dialog"
    @send-cart="saveFoodItemsToPantry"
  ></AddFoodItemDialog>
</template>
<script>
import AddFoodItemDialog from "../AddFoodItemDialog.vue";
import { useDisplay } from "vuetify";
import { postReq } from "@/util/util";
import { eraseCachedPantryRecipes } from "@/util/util";

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
  emits: ["updatePantry"],
  methods: {
    open() {
      this.dialog = true;
    },
    async saveFoodItemsToPantry(cart) {
      let pantry = [];
      for (let itemId in cart) {
        const item = cart[itemId];
        let updateInventory = {
          foodId: item.id,
          quantity: item.quantity,
          unit: item.unit,
        };

        pantry = await postReq(
          "v1/api/inventory/updateInventory",
          updateInventory,
          {
            200: "Succesfully updated pantry!",
            err: "Could not update pantry.",
            403: "You need to be logged in to update the pantry.",
          }
        );
      }

      eraseCachedPantryRecipes();

      this.$emit("updatePantry", pantry);
    },
  },
  components: { AddFoodItemDialog },
};
</script>
