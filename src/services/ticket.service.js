import { http } from "./http.service.js";

export const showPlaces = (movie_id, daytime, showdate) => {
  return new Promise((resolve, reject) => {
    http
      .get("/showPlaces", {
        params: {
          movie_id,
          daytime,
          showdate,
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

export const buyTicket = ({ movie_id, row, seat, showdate, daytime }) => {
  return new Promise((resolve, reject) => {
    http
      .post("/bookPlace", {
        seat,
        row,
        movie_id,
        daytime,
        showdate,
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
