<template>
  <v-card
    class="mx-auto"
    :class="{ 'rounded-b-0': show }"
    max-width="344"
    :to="`/${id}`"
  >
    <v-img :src="poster" :aspect-ratio="233 / 344"></v-img>

    <v-card-title class="text-truncate d-block" :title="name" v-html="name" />

    <v-card-actions>
      <v-btn color="orange lighten-2" text :to="`/${id}`"> Details </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div
        v-show="show"
        class="card-description elevation-2 white"
        v-click-outside="{
          handler: close,
          include: include,
        }"
      >
        <v-divider></v-divider>

        <v-card-text v-html="description"></v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    id: {
      type: [String, Number],
      default: 0,
      required: true,
    },
    poster: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    include() {
      return [this.$el];
    },
  },
};
</script>

<style scoped>
.card-description {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  border-radius: 0 0 4px 4px !important;
}
</style>
