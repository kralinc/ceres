<script setup>
import ForgotPassForm from "@/components/userloginforms/ForgotPassForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col lg="7">
      <ForgotPassForm class="ma-5"></ForgotPassForm>
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
  //  mounted() {
  //    if (this.message != false) {
  //      this.mainStore.setSnackbar(this.message, "red-darken-3");
  //    }
  //  },
};
</script>
