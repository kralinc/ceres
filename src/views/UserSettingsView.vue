<template>
  <v-row>
    <v-col class="d-flex justify-center">
      <h1>Settings</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>User Info</h3>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field variant="outlined" label="First Name"></v-text-field>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field variant="outlined" label="Last Name"></v-text-field>
    </v-col>
    <v-col cols="12" lg="6">
      <v-text-field variant="outlined" label="Email Address"></v-text-field>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <h3>Allergies/Dislikes</h3>
      <v-combobox label="Add Items" :items="visibleComboboxItems"></v-combobox>
      <v-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient of dislikedIngredients" :key="ingredient.id">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.description }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "UserSettingsView",
  data() {
    return {
      dislikedIngredients: [],
      visibleComboboxItems: [],
    };
  },
};
</script>
