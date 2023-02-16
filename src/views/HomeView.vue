<template>
  <v-container class="d-flex justify-center align-center text-h5">
    <v-text-field
      label="Search"
      prepend-inner-icon="mdi-magnify"
      clearable
      @click:clear="onClear"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    onClear() {
      alert("wooza wawa");
    },
  },
};
</script>
