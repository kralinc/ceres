<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign Up</v-card-title>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col
            ><v-text-field
              v-model="user.firstName"
              class="mx-3 my-1"
              label="First Name"
            ></v-text-field
          ></v-col>
          <v-col
            ><v-text-field
              v-model="user.lastName"
              class="mx-3 my-1"
              label="Last Name"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-text-field
          v-model="user.username"
          class="mx-3 my-1"
          label="Username"
          hint="Username must be between 4 and 25 characters. It can't start with a digit."
          :rules="usernameRules"
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
          label="Create Password"
          hint="Password must be between 8 and 25 characters. Must contain a special character and uppercase letter."
          :rules="passwordRules"
          @click:append-inner="showPass = !showPass"
          required
          class="mx-3 my-1"
        ></v-text-field>

        <v-text-field
          v-model="user.passwordConfirm"
          :append-inner-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassConfirm ? 'text' : 'password'"
          label="Reenter Password"
          @click:append-inner="showPassConfirm = !showPassConfirm"
          :rules="confirmPasswordRules"
          required
          class="mx-3 my-1"
        ></v-text-field>

        <v-btn block class="mx-auto mt-3" @click="validate">Sign Up</v-btn>
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
        (v) =>
          /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/.test(
            v
          ) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,25}$/.test(
            v
          ) || "Password must be valid",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirming the password is required",
        (v) => this.user.password == v || "Input must match the password",
      ],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => /^[^1-9].{4,25}$/.test(v) || "Username must be valid",
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
              this.$router.push("/login");
            } else if (!response.ok) {
              throw new Error(text);
            }
          })
        )
        .catch((e) => this.mainStore.setSnackbar(e, "red-darken-3"));
    },
    async validate() {
      let results = await this.$refs.form.validate();
      if (results.valid) {
        this.submitSignUp();
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
