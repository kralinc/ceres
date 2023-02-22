<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign In</v-card-title>
    <v-form class="my-8" @submit.prevent="submit">
      <v-text-field class="mx-3 my-1" label="Username" required></v-text-field>

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

  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">Sign Up</v-card-title>
    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col
            ><v-text-field
              class="mx-3 my-1"
              label="First Name"
              required
            ></v-text-field
          ></v-col>
          <v-col
            ><v-text-field
              class="mx-3 my-1"
              label="Last Name"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-text-field
          class="mx-3 my-1"
          label="Username"
          required
        ></v-text-field>

        <v-text-field class="mx-3 my-1" label="Email" required></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="showPassSignUp ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassSignUp ? 'password' : 'text'"
          name="input-10-1"
          label="Create Password"
          @click:append-inner="showPassSignUp = !showPassSignUp"
          class="mx-3 my-1"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="showPassSignUp ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassSignUp ? 'password' : 'text'"
          name="input-10-1"
          label="Reenter Password"
          @click:append-inner="showPassSignUp = !showPassSignUp"
          class="mx-3 my-1"
        ></v-text-field>

        <v-btn block class="mx-auto mt-3" @click="submitLogin">Sign Up</v-btn>
        <div class="my-3">
          <a class="font-italic" href="url">Forgot your password?</a>
        </div>
      </v-container>
    </v-form>
  </v-card>

  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4"
      >Account's Email Address</v-card-title
    >
    <v-form class="my-8" @submit.prevent="submit">
      <v-text-field
        class="mx-3 my-1"
        label="Email Address or Username"
        required
      ></v-text-field>

      <v-btn block class="mx-auto mt-3" @click="submitLogin"
        >Reset Password</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showPassLogin: true,
      showPassSignUp: true,
      showPassReset: true,
    };
  },
};
</script>
