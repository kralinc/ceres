<template>
  <v-lazy>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="searchCard"
        variant="tonal"
        v-bind="props"
        :elevation="isHovering ? 16 : 0"
      >
        <v-row>
          <v-col cols="3">
            <v-img :src="item.picUrl"></v-img>
          </v-col>
          <v-col cols="9">
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
            <v-card-subtitle>{{
              item.reusable === true ? "Reusable" : "Not Reusable"
            }}</v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
export default {
  props: ["item"],
};
</script>
<style>
.searchCard:hover {
  cursor: pointer;
}
</style>
