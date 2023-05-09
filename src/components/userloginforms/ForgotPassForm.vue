<template>
  <v-card class="pa-5">
    <v-card-title class="text-h6 text-md-h5 text-lg-h4"
      >Account's Email Address</v-card-title
    >
    <v-form ref="form" class="my-8">
      <v-text-field
        v-model="email"
        class="mx-3 my-1"
        label="Enter an Email Address"
        :rules="emailRules"
        required
      ></v-text-field>

      <v-btn block class="mx-auto mt-3" @click="validate">Reset Password</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "@/stores/MainStore";
import { TLD } from "@/util/util.js";

export default {
  data() {
    return {
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/.test(
            v
          ) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    submitPassReset() {
      fetch(TLD + "v1/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: this.email,
      })
        .then((response) =>
          response.text().then((text) => {
            // Make this more comprehensive and thorough
            if (response.status == "201") {
              this.mainStore.setSnackbar(
                "Email successfully send if the user exists!",
                "green"
              );
              this.$router.push("/home");
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
        this.submitPassReset();
      }
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
};
</script>
