<script setup>
import ChangePassForm from "@/components/userloginforms/ChangePassForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row class="rowSize" align="center" justify="center" no-gutters>
    <v-col lg="6">
      <ChangePassForm class="mb-12"></ChangePassForm>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ChangePassView",
  methods: {
    onClear() {
      alert("Oops");
    },
  },
  components: { ChangePassForm },
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
