<template>
  <v-lazy>
    <v-card variant="tonal">
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
  </v-lazy>
</template>
<script>
export default {
  props: ["item"],
};
</script>
