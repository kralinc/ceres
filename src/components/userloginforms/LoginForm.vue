<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign In</v-card-title>
    <v-form class="my-8" @submit.prevent="submit">
      <v-text-field
        v-model="username"
        class="mx-3 my-1"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-inner-icon="showPassLogin ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassLogin ? 'password' : 'text'"
        name="input-10-1"
        label="Password"
        @click:append-inner="showPassLogin = !showPassLogin"
        class="mx-3 my-1"
      ></v-text-field>

      <v-btn block class="mx-auto mt-3" @click="submitLogin">Login</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showPassLogin: true,
      username: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      fetch("http://localhost:8080/v1/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) =>
          response.text().then((text) => {
            // Make this more comprehensive and thorough
            if (response.status == "200") {
              localStorage.setItem("token", text);
            } else if (!response.ok) {
              throw new Error(text);
            }
          })
        )
        .catch((e) => console.log(e.message));
    },
  },
};
</script>
