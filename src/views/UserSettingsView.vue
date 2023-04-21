<template>
  <v-row>
    <v-col class="d-flex justify-center">
      <h1>Settings</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>User Info</h3>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field
        variant="outlined"
        label="First Name"
        v-model="userInfo.firstName"
      ></v-text-field>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field
        variant="outlined"
        label="Last Name"
        v-model="userInfo.lastName"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn prepend-icon="mdi-content-save" @click="updateUserInfo"
        >Save</v-btn
      >
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>Display</h3>
      <div class="text-subtitle-1 text-medium-emphasis">Unit Type</div>
      <v-select
        label="Choose a Unit Type"
        :items="unitTypes"
        v-model="selectedUnit"
      ></v-select>
      <v-btn prepend-icon="mdi-content-save" @click="updateUnitPreference"
        >Save</v-btn
      >
    </v-col>
    <v-divider></v-divider>
    <DislikedIngredients
      :all-food-items-prop="allFoodItems"
    ></DislikedIngredients>
    <MinorIngredients :all-food-items-prop="allFoodItems"></MinorIngredients>
  </v-row>
</template>
<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import DislikedIngredients from "@/components/settings/DislikedIngredients.vue";
import MinorIngredients from "@/components/settings/MinorIngredients.vue";
import { getReq, postReq } from "@/util/util";
export default {
  name: "UserSettingsView",
  data() {
    return {
      userInfo: {},
      unitTypes: ["Metric", "Imperial"],
      selectedUnit: "",
      currentUnit: "",
      allFoodItems: [],
    };
  },
  methods: {
    async updateUserInfo() {
      const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.userInfo.firstName !== currentUserInfo.firstName) {
        await this.updateName(this.userInfo.firstName, "first", {
          200: "Succesfully updated name!",
        });
      }
      if (this.userInfo.lastName !== currentUserInfo.lastName) {
        await this.updateName(this.userInfo.lastName, "last", {
          200: "Succesfully updated name!",
        });
      }
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    },
    async updateName(newName, nameIndicator) {
      let nameObject = { newName: newName, nameIndicator: nameIndicator };
      return await postReq("v1/api/user/updateName", nameObject);
    },
    async updateUnitPreference() {
      if (this.currentUnit !== this.selectedUnit) {
        await postReq(
          "v1/api/user/setUserPreferences",
          { fieldToUpdate: "unit" },
          { 200: "Successfully updated unit preference!" }
        );
        this.currentUnit = this.selectedUnit;
        this.mainStore.setMetric(this.currentUnit === "Metric" ? true : false);
      }
    },
  },
  async mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const userPreferences = await postReq("v1/api/user/getUserPreferences");
    this.mainStore.setMetric(userPreferences.metric);
    this.currentUnit = this.selectedUnit = this.mainStore.metric
      ? "Metric"
      : "Imperial";

    this.allFoodItems = await getReq("v1/api/food", {
      err: "Something went wrong while fetching the food items.",
    });
  },
  computed: {
    ...mapStores(useMainStore),
  },
  components: { DislikedIngredients, MinorIngredients },
};
</script>
