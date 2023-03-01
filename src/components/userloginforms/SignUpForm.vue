<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign Up</v-card-title>
    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col
            ><v-text-field
              v-model="user.firstName"
              class="mx-3 my-1"
              label="First Name"
              required
            ></v-text-field
          ></v-col>
          <v-col
            ><v-text-field
              v-model="user.lastName"
              class="mx-3 my-1"
              label="Last Name"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-text-field
          v-model="user.username"
          class="mx-3 my-1"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          class="mx-3 my-1"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          name="input-10-1"
          label="Create Password"
          @click:append-inner="showPass = !showPass"
          class="mx-3 my-1"
        ></v-text-field>

        <v-text-field
          v-model="user.passwordConfirm"
          :append-inner-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassConfirm ? 'text' : 'password'"
          name="input-10-1"
          label="Reenter Password"
          @click:append-inner="showPassConfirm = !showPassConfirm"
          class="mx-3 my-1"
        ></v-text-field>

        <v-btn block class="mx-auto mt-3" @click="submitSignUp">Sign Up</v-btn>
        <div class="my-3">
          <a class="font-italic" href="url">Forgot your password?</a>
        </div>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";

export default {
  data() {
    return {
      showPass: false,
      showPassConfirm: false,
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submitSignUp() {
      fetch("http://localhost:8080/v1/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        }),
      })
        .then((response) =>
          response.text().then((text) => {
            // Make this more comprehensive and thorough
            if (response.status == "201") {
              this.mainStore.setSnackbar(
                "Successfully created an account!",
                "green"
              );
            } else if (!response.ok) {
              throw new Error(text);
            }
          })
        )
        .catch((e) => this.mainStore.setSnackbar(e, "red-darken-3"));
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
