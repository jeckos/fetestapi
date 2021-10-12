import { http } from "./http.service.js";

export const getMovie = (params = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get("/movies", {
        params,
      })
      .then(({ data }) => {
        if (data && data?.error_code === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMovieSessions = ({ movie_id } = {}) => {
  return new Promise((resolve, reject) => {
    http
      .get("/movieShows", {
        params: {
          movie_id,
        },
      })
      .then(({ data }) => {
        if (data && data?.error_code === 0) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMovieWithSession = (params) => {
  return Promise.all([getMovie(params), getMovieSessions(params)]).then(
    ([{ data: allMovies }, { data: allSession }]) => {
      return allMovies.map((movie) => {
        return {
          ...movie,
          sessions: allSession[movie.id] || [],
        };
      });
    }
  );
};
