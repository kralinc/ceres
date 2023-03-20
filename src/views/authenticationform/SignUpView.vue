<script setup>
import SignUpForm from "@/components/userloginforms/SignUpForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col lg="7">
      <SignUpForm class="ma-5"></SignUpForm>
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
  //  mounted() {
  //    if (this.message != false) {
  //      this.mainStore.setSnackbar(this.message, "red-darken-3");
  //    }
  //  },
};
</script>
