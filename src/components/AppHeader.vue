<template>
  <v-app-bar app color="white">
    <v-toolbar-items>
      <v-btn
        to="/"
        text
        x-large
        plain
        class="text-h5 font-weight-black text-capitalize"
      >
        MoviePlace
      </v-btn>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <v-btn to="/all-sessions" text x-large class="text-capitalize">
        All sessions
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped></style>
