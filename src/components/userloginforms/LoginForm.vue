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

      <div class="my-3">
        <router-link to="/forgotPassword" class="router-link">
          Forgot your password?
        </router-link>
      </div>
      <div class="my-3">
        <router-link to="/signUp" class="router-link">
          A new user? Sign Up Here!
        </router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { postReq } from "@/util/util.js";

export default {
  data() {
    return {
      showPassLogin: true,
      username: "",
      password: "",
    };
  },
  methods: {
    async submitLogin() {
      const body = {
        username: this.username,
        password: this.password,
      };
      const token = await postReq("v1/api/auth/signin", body, {
        200: "Successfully logged in!",
        403: "Username or Password incorrect",
      });
      if (token) {
        localStorage.setItem("token", token);
        this.mainStore.setLogin(true);
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
