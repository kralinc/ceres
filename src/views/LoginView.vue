<script setup>
import LoginForm from "@/components/userloginforms/LoginForm.vue";
import SignUpForm from "@/components/userloginforms/SignUpForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col lg="7">
      <LoginForm class="ma-5"></LoginForm>
      <SignUpForm class="ma-5"></SignUpForm>
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
  components: { LoginForm, SignUpForm },
  computed: {
    ...mapStores(useMainStore),
  },
  //  mounted() {
  //    if (this.message != false) {
  //      this.mainStore.setSnackbar(this.message, "red-darken-3");
  //    }
  //  },
};
</script>
