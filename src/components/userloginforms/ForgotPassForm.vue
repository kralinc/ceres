<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4"
      >Account's Email Address</v-card-title
    >
    <v-form class="my-8" @submit.prevent="submit">
      <v-text-field
        class="mx-3 my-1"
        label="Email Address or Username"
        required
      ></v-text-field>

      <v-btn block class="mx-auto mt-3" @click="submitLogin"
        >Reset Password</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
//import { mapStores } from "pinia";
//import { useMainStore } from "@/stores/MainStore";

export default {
  data() {
    return {
      showPassReset: true,
    };
  },
};
</script>
