<script setup>
import ChangePassForm from "@/components/userloginforms/ChangePassForm.vue";
import { useMainStore } from "@/stores/MainStore";
import { mapStores } from "pinia";
</script>

<template>
  <v-row justify="center" no-gutters>
    <v-col lg="7">
      <ChangePassForm class="ma-5"></ChangePassForm>
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
  //  mounted() {
  //    if (this.message != false) {
  //      this.mainStore.setSnackbar(this.message, "red-darken-3");
  //    }
  //  },
};
</script>
