<template>
  <v-table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="recipe of recipes"
        :key="recipe.id"
        @click="gotoRecipePage(recipe.id)"
      >
        <td>{{ recipe.name }}</td>
        <td>
          {{ recipe.description ? recipe.description.substring(0, 100) : "" }}
        </td>
        <td>
          <v-rating
            readonly
            density="compact"
            v-model="recipe.avgRating"
          ></v-rating>
          <p>({{ recipe.reviewCount }})</p>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
export default {
  props: ["recipes"],
  methods: {
    gotoRecipePage(id) {
      this.$router.push("/recipe/" + id);
    },
  },
};
</script>
