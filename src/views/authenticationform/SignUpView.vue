<script setup>
import SignUpForm from "@/components/userloginforms/SignUpForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row class="rowSize" align="center" justify="center" no-gutters>
    <v-col lg="6">
      <SignUpForm class="mb-12"></SignUpForm>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SignUpView",
  methods: {
    onClear() {
      alert("Oops");
    },
  },
  components: { SignUpForm },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
<style>
.rowSize {
  height: 100%;
}
</style>
