<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-select
          :items="movieGenres"
          v-model="genre"
          hide-details
          height="48"
          placeholder="Choose genre"
          clearable
        />
      </v-col>
      <v-col cols="12" md="9">
        <v-text-field
          v-model="search"
          hide-details
          height="48"
          placeholder="Start writing to find a movie"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="movie in movies"
        :key="movie.id"
      >
        <MovieCard
          :id="movie.id"
          :name="movie.name"
          :poster="movie.image"
          :description="movie.description"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
const { getMovie } = require("../services/movie.service.js");
export default {
  name: "Home",
  components: { MovieCard },
  data() {
    return {
      genre: "",
      search: "",
      movieGenres: [
        { text: "Action", value: 0 },
        { text: "Adventures", value: 1 },
        { text: "Comedy", value: 2 },
        { text: "Drama", value: 3 },
        { text: "Horror", value: 4 },
        { text: "Westerns", value: 5 },
      ],
      movies: [],
    };
  },
  watch: {
    genre() {
      this.getMovies(this.searchParams);
    },
    search() {
      this.getMovies(this.searchParams);
    },
  },
  computed: {
    searchParams() {
      const params = {
        name: this.search || "",
        genres: this.genre || "",
      };

      if (!params.name) {
        delete params.name;
      }
      if (!params.genres) {
        delete params.genres;
      }
      return params;
    },
  },
  methods: {
    getMovies(params) {
      getMovie(params)
        .then(({ data: movies }) => {
          this.movies = movies;
        })
        .catch(() => {
          alert("Something went wrong. Please try again later!");
        });
    },
  },
  mounted() {
    this.getMovies();
  },
};
</script>
