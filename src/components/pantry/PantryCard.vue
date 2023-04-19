<template>
  <v-col cols="6" sm="4" lg="3" xl="2" class="card">
    <v-card variant="tonal">
      <v-img
        :src="pantryItem.foodId.picUrl"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        cover
      >
        <v-card-title
          class="text-white"
          v-text="pantryItem.foodId.name"
        ></v-card-title>
      </v-img>
      <v-card-text>
        <h3>{{ pantryItem.quantity }} {{ pantryItem.unit }}</h3>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    pantryItem: Object,
  },
  computed: {
    itemQuantity() {
      return this.pantryItem.quantity;
    },
  },
};
</script>
<style>
.card {
  max-width: 200px;
}
</style>
