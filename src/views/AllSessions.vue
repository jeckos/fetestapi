<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="movie in movies" :key="movie.id" class="my-4">
        <v-card>
          <v-row>
            <v-col cols="12" sm="3" lg="2">
              <v-img :src="movie.image"></v-img>
            </v-col>
            <v-col cols="12" sm="9" lg="10">
              <router-link :to="`/${movie.id}`">
                <h2 class="pb-4" v-html="movie.name"
              /></router-link>

              <div>
                <div
                  v-for="session in movie.sessions"
                  :key="session.showdate"
                  class="mb-4"
                >
                  <h4>{{ session.showdate }}</h4>
                  <v-chip
                    v-for="time in (session.daytime || '').split(';')"
                    :key="time"
                    class="ma-1"
                    @click="
                      selectPlace(movie.name, movie.id, time, session.showdate)
                    "
                    >{{ time }}
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { getMovieWithSession } = require("../services/movie.service.js");
export default {
  name: "AllSessions",
  data() {
    return {
      movies: [],
    };
  },
  methods: {
    async getAllSessions() {
      this.movies = await getMovieWithSession();
    },
    selectPlace(movie_name, movie_id, daytime, showdate) {
      this.$EventBus.$emit("selectPlace", {
        movie_name,
        movie_id,
        daytime,
        showdate,
      });
    },
  },
  mounted() {
    this.getAllSessions();
  },
};
</script>

<style scoped></style>
