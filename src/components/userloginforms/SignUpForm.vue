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
          @click:append-inner="showPassSignUp = !showPassSignUp"
          class="mx-3 my-1"
        ></v-text-field>

        <v-text-field
          v-model="user.passwordConfirm"
          :append-inner-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassConfirm ? 'text' : 'password'"
          name="input-10-1"
          label="Reenter Password"
          @click:append-inner="showPassSignUp = !showPassSignUp"
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
      fetch("http://localhost:8080/signup", {
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
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
};
</script>
