<template>
  <v-table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <v-hover
        v-slot="{ isHovering, props }"
        v-for="recipe of recipes"
        :key="recipe.id"
      >
        <tr
          :class="'table-row ' + (isHovering ? 'hovering' : '')"
          v-bind="props"
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
      </v-hover>
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
<style>
.table-row:hover {
  cursor: pointer;
}
.table {
  margin-left: auto;
  margin-right: auto;
}
.hovering {
  background-color: #0003;
}
</style>
