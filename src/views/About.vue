<template>
  <v-container>
    <v-row v-if="movie">
      <v-col cols="12" sm="6" order="1" order-lg="1" lg="3" xl="2">
        <v-img
          :src="movie.image"
          :aspect-ratio="233 / 344"
          class="rounded-lg"
        />
      </v-col>
      <v-col cols="12" sm="12" order="3" order-lg="1" lg="6" xl="7">
        <h1 v-html="movie.name" class="mb-6"></h1>
        <div v-html="movie.additional" class="movie_credentials mb-6"></div>
        <div v-html="movie.description"></div>
      </v-col>
      <v-col cols="12" sm="6" order="2" order-lg="1" lg="3" xl="3">
        <v-select
          :items="movie.sessions"
          item-text="showdate"
          return-object
          v-model="currentSession"
        />
        <div>
          <v-chip
            v-for="time in (currentSession.daytime || '').split(';')"
            :key="time"
            class="ma-1"
            @click.prevent="
              selectPlace(
                movie.name,
                $route.params.id,
                time,
                currentSession.showdate
              )
            "
            >{{ time }}
          </v-chip>
        </div>
      </v-col>
    </v-row>
    <div v-else class="text-h4 text-center font-weight-black">
      Movie not found, sorry
    </div>
  </v-container>
</template>

<script>
import { getMovieWithSession } from "../services/movie.service.js";

export default {
  name: "About",
  data() {
    return {
      movie: {},
      currentSession: "",
      dialog: false,
    };
  },
  methods: {
    async getMovie() {
      try {
        const movie = await getMovieWithSession({
          movie_id: this.$route.params.id,
        });

        this.movie = movie[0];

        this.currentSession = this.movie?.sessions[0];
      } catch (e) {
        alert("Something went wrong. Please try again later!");
      }
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
    this.getMovie();
  },
};
</script>

<style>
.movie_credentials ul {
  padding: 0;
  list-style: none;
}

.movie_credentials ul li {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
}
.movie_credentials ul li > * {
  margin-bottom: 0;
}
.movie_credentials ul li .key {
  width: 180px;
  color: #000;
}
.movie_credentials ul li .val {
  color: #999;
  width: calc(100% - 180px);
}

.movie_credentials ul li .val a {
  color: #999999;
  pointer-events: none;
  cursor: vertical-text;
}
</style>
