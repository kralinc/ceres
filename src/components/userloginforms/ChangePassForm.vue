<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4"
      >Account's Email Address</v-card-title
    >
    <v-form class="my-8">
      <v-text-field
        v-model="oldPassword"
        :append-inner-icon="showOldPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showOldPass ? 'text' : 'password'"
        label="Enter your old password"
        @click:append-inner="showOldPass = !showOldPass"
        class="mx-3 my-1"
      ></v-text-field>

      <v-text-field
        v-model="newPassword"
        :append-inner-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showNewPass ? 'text' : 'password'"
        label="Enter your new password"
        @click:append-inner="showNewPass = !showNewPass"
        class="mx-3 my-1"
      ></v-text-field>

      <v-text-field
        v-model="newConfirmPassword"
        :append-inner-icon="showNewPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showNewPassConfirm ? 'text' : 'password'"
        label="Confirm your new password"
        :rules="confirmPasswordRules"
        @click:append-inner="showNewPassConfirm = !showNewPassConfirm"
        class="mx-3 my-1"
      ></v-text-field>

      <v-btn block class="mx-auto mt-3" @click="validate">Reset Password</v-btn>
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
      oldPassword: "",
      newPassword: "",
      newConfirmPassword: "",
      showOldPass: false,
      showNewPass: false,
      showNewPassConfirm: false,
      confirmPasswordRules: [
        (v) => !!v || "Confirming the password is required",
        (v) => this.user.password == v || "Input must match the password",
      ],
    };
  },
  methods: {
    async submitPassChange() {
      const body = {
        token: this.$route.query.token,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };

      const response = postReq("v1/api/auth/updatePassword", body, {
        202: "Password successfully changed!",
      });

      if (response) {
        this.$router.push("/login");
      } else {
        this.mainStore.setSnackbar(response);
      }
    },
    async validate() {
      let results = await this.$refs.form.validate();
      if (results.valid) {
        this.submitPassChange();
      }
    },
  },
  created() {
    if (!this.$route.query.token) {
      this.$router.push("/login");
      this.mainStore.setSnackbar("No valid token for the page", "red-darken-3");
    }
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
