<script setup>
import LoginForm from "@/components/userloginforms/LoginForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col lg="7">
      <LoginForm class="ma-5"></LoginForm>
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
