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
          <v-img :src="item.foodId.picUrl"></v-img>
        </v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="3">
              <v-col cols="12">
                <h2>You have:</h2>
              </v-col>
              <v-col cols="12">
                <h1>
                  {{ dialogItem.quantity.toFixed(4) }} {{ dialogItem.unit }}
                </h1>
              </v-col>
            </v-col>
            <v-col cols="12" md="9">
              <v-col cols="12">
                <h2>Add / Subtract</h2>
              </v-col>
              <v-text-field
                type="number"
                v-model="item.quantity"
              ></v-text-field>
              <v-select
                :items="units[item.foodId.unitType]"
                v-model="item.unit"
              ></v-select>
              <v-btn
                variant="outlined"
                prepend-icon="mdi-close"
                color="error"
                @click="removeItem"
                >Remove</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { useDisplay } from "vuetify";
import { postReq } from "@/util/util";
import {
  eraseCachedPantryRecipes,
  UNITS_IMPERIAL,
  UNITS_METRIC,
} from "@/util/util";
export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  mounted() {
    this.units = this.mainStore.metric ? UNITS_METRIC : UNITS_IMPERIAL;
  },
  props: ["modelValue", "dialogItem"],
  emits: ["update:modelValue", "updatePantry"],
  data() {
    return {
      item: {},
      units: [],
    };
  },
  watch: {
    modelValue(newValue) {
      if (newValue) {
        this.item = structuredClone(this.dialogItem);
        this.item.quantity = 0;
      }
    },
  },
  methods: {
    async removeItem() {
      const updateInventory = {
        foodId: this.dialogItem.foodId.id,
        quantity: this.dialogItem.quantity * -1,
        unit: this.dialogItem.unit,
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
        eraseCachedPantryRecipes();
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
        quantity: this.item.quantity,
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
        eraseCachedPantryRecipes();
        this.$emit("updatePantry", pantry);
        this.$emit("update:modelValue", false);
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
