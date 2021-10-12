<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
          tile
          class="flex-shrink-0"
          max-height="64"
        >
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Select a row and place to view</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn text :disabled="!selectedMovie.seat" @click="buyTicket"
              >Buy ticket</v-btn
            >
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card-title v-html="selectedMovie.movie_name" class="mb-6" />
          <v-card-subtitle class="mb-6">
            {{ selectedMovie.showdate }} - {{ selectedMovie.daytime }}
          </v-card-subtitle>
          <div v-for="place in places" :key="place.row" class="d-flex mb-6">
            <div class="place-row">Row {{ place.row }}</div>

            <div>
              <v-chip
                v-for="seat in place.seat"
                :key="seat.seat"
                class="ma-1"
                :disabled="!seat.is_free"
                :color="
                  place.row === selectedMovie.row &&
                  seat.seat === selectedMovie.seat
                    ? 'primary'
                    : ''
                "
                @click="selectPlace(place.row, seat.seat)"
              >
                {{ seat.seat }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="ticketDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 lighten-2"> Your ticket </v-card-title>

        <v-card-text class="d-flex align-center justify-center">
          <qrcode-vue :value="JSON.stringify(ticket)" size="256"></qrcode-vue>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="ticketDialog = false">OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { showPlaces } from "./services/ticket.service.js";
import AppHeader from "./components/AppHeader.vue";
import QrcodeVue from "qrcode.vue";
const { buyTicket } = require("./services/ticket.service.js");
export default {
  name: "App",
  components: { AppHeader, QrcodeVue },
  data: () => ({
    dialog: false,
    ticketDialog: false,
    places: [],
    ticket: {},
    selectedMovie: {
      movie_name: "",
      movie_id: null,
      row: null,
      seat: null,
      showdate: null,
      daytime: null,
    },
  }),
  watch: {
    dialog(val) {
      if (!val) {
        this.places = "";
        this.selectedMovie = {
          movie_name: "",
          movie_id: null,
          row: null,
          seat: null,
          showdate: null,
          daytime: null,
        };
      }
    },
  },
  methods: {
    async buyTicket() {
      try {
        const { data: ticket } = await buyTicket(this.selectedMovie);
        this.dialog = false;
        this.ticket = ticket;
        this.ticketDialog = true;
      } catch (e) {
        alert("Something went wrong. Please try again later!");
      }
    },
    selectPlace(row, seat) {
      if (row === this.selectedMovie.row && seat === this.selectedMovie.seat) {
        this.selectedMovie.row = null;
        this.selectedMovie.seat = null;
      } else {
        this.selectedMovie.row = row;
        this.selectedMovie.seat = seat;
      }
    },
    async showPlaces(movie_name, movie_id, daytime, showdate) {
      if (!movie_id || !daytime || !showdate) {
        alert("Please select movie");
        return;
      }
      try {
        const { data: places } = await showPlaces(movie_id, daytime, showdate);

        this.places = places.map(([row, seat]) => {
          return { row: row.row, seat };
        });
        this.selectedMovie.movie_id = movie_id;
        this.selectedMovie.daytime = daytime;
        this.selectedMovie.showdate = showdate;
        this.selectedMovie.movie_name = movie_name;
        this.dialog = true;
      } catch (e) {
        alert("Something went wrong. Please try again later!");
      }
    },
  },

  created() {
    this.$EventBus.$on(
      "selectPlace",
      async ({ movie_name, movie_id, daytime, showdate }) => {
        await this.showPlaces(movie_name, movie_id, daytime, showdate);
      }
    );
  },
};
</script>

<style>
.place-row {
  min-width: 100px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
