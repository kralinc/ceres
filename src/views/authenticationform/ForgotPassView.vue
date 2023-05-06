<script setup>
import ForgotPassForm from "@/components/userloginforms/ForgotPassForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row class="rowSize" align="center" justify="center" no-gutters>
    <v-col lg="6">
      <ForgotPassForm class="mb-12"></ForgotPassForm>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ForgotPassView",
  methods: {
    onClear() {
      alert("Oops");
    },
  },
  components: { ForgotPassForm },
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
