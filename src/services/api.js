const URL = "https://api.themoviedb.org/3";
// https://image.tmdb.org/t/p/w500/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWI2MmFmOTdkOTUxOWExNTMzZTQwOTlkMTVlZTQ2NyIsInN1YiI6IjYyZjRiOWNhYjM5ZTM1MDA4MGZiNzZlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kDyHDDk-dqOjTnt5LH_BK32geajoTJ31_jwDgxjj13w",
  },
};

async function getTrendingMovies() {
  const res = await fetch(`${URL}/trending/movie/week?language=en-US`, options);
  return await res.json();
}

async function getPopularMovies(page) {
  const res = await fetch(
    `${URL}/movie/popular?language=en-US&page=${page}`,
    options
  );
  return await res.json();
}

async function getMovieByQuery(query) {
  const res = await fetch(
    `${URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return await res.json();
}

async function getDetais(id) {
  const res = await fetch(`${URL}/movie/${id}?language=en-US`, options);
  return await res.json();
}

async function getCredits(id) {
  const res = await fetch(`${URL}/movie/${id}/credits?language=en-US`, options);
  return res.json();
}

async function getReviews(id) {
  const res = await fetch(
    `${URL}/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  return res.json();
}

async function getGenresIds() {
  const res = await fetch(`${URL}/genre/movie/list?language=en`, options);
  return res.json();
}

const api = {
  getTrendingMovies,
  getPopularMovies,
  getMovieByQuery,
  getDetais,
  getCredits,
  getReviews,
  getGenresIds,
};

export default api;
