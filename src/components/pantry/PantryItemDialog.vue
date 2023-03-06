<template>
  <v-dialog
    :model-value="modelValue"
    @click:outside="$emit('update:modelValue', false)"
    persistent
    no-click-animation
    transition="dialog-bottom-transition"
    :fullscreen="smAndDown"
  >
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('update:modelValue', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ dialogItem.foodId.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="$emit('update:modelValue', false)">
          Save
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-row>
        <v-col cols="12" md="3">
          <v-img :src="'https://placekitten.com/600/450'"></v-img>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field type="number"></v-text-field>
          <p>{{ dialogItem.unit }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { useDisplay } from "vuetify";
export default {
  setup() {
    const { smAndDown } = useDisplay();

    return { smAndDown };
  },
  props: ["modelValue", "dialogItem"],
  emits: ["update:modelValue"],
};
</script>
