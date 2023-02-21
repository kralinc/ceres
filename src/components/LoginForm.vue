<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign In</v-card-title>
    <form class="my-8" @submit.prevent="submit">
      <v-text-field class="mx-3 my-1" label="Username" required></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        @click:append-inner="show1 = !show1"
        class="mx-3 my-1"
      ></v-text-field>

      <v-btn block class="mx-3 mt-3" @click="submitLogin"> Login </v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
    };
  },
};
</script>
