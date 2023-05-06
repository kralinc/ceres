<script setup>
import LoginForm from "@/components/userloginforms/LoginForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row class="rowSize" align="center" justify="center" no-gutters>
    <v-col lg="6">
      <LoginForm class="mb-12"></LoginForm>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LoginView",
  methods: {
    onClear() {
      alert("Oops");
    },
  },
  components: { LoginForm },
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
