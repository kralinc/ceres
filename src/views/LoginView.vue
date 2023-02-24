<script setup>
import LoginForm from "@/components/LoginForm.vue";
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
};
</script>
