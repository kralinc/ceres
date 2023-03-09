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
      <v-toolbar-title>{{ item.foodId.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="saveItemChanges"> Save </v-btn>
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
            v-model="item.quantity"
            :rules="[rules.quantity]"
          ></v-text-field>
          <v-text-field v-model="item.unit"></v-text-field>
          <v-btn
            variant="outlined"
            prepend-icon="mdi-close"
            color="error"
            @click="removeItem"
            >Remove</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { useDisplay } from "vuetify";
import { postReq } from "@/util/util";
export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  props: ["modelValue", "dialogItem"],
  emits: ["update:modelValue", "updatePantry"],
  data() {
    return {
      item: {},
      rules: {
        quantity: (value) => value > 0 || "Quantity must be greater than zero",
      },
    };
  },
  watch: {
    modelValue(newValue) {
      if (newValue) {
        this.item = structuredClone(this.dialogItem);
      }
    },
  },
  methods: {
    async removeItem() {
      const updateInventory = {
        foodId: this.dialogItem.foodId.id,
        quantity: parseInt(this.dialogItem.quantity) * -1,
        unit: "",
      };
      const pantry = await postReq(
        "v1/api/inventory/updateInventory",
        updateInventory,
        {
          200: "Succesfully removed item!",
          err: "Could not update pantry.",
          403: "You need to be logged in to update the pantry.",
        }
      );
      if (pantry) {
        this.$emit("updatePantry", pantry);
        this.$emit("update:modelValue", false);
      }
    },
    async saveItemChanges() {
      if (
        this.item.quantity === this.dialogItem.quantity &&
        this.item.unit === this.dialogItem.unit
      ) {
        this.$emit("update:modelValue", false);
        return;
      }

      const updateInventory = {
        foodId: this.dialogItem.foodId.id,
        quantity: this.item.quantity - this.dialogItem.quantity,
        unit: this.item.unit,
      };

      const pantry = await postReq(
        "v1/api/inventory/updateInventory",
        updateInventory,
        {
          200: "Succesfully updated item!",
          err: "Could not update pantry.",
          403: "You need to be logged in to update the pantry.",
        }
      );
      if (pantry) {
        this.$emit("updatePantry", pantry);
        this.$emit("update:modelValue", false);
      }
    },
  },
};
</script>
