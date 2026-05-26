const API_URL = "https://api.themoviedb.org/3";

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const withApiKey = (path) =>
  `${API_URL}${path}?api_key=${API_KEY}&language=es-ES`;

export const movieEndpoints = {
  trending: withApiKey("/trending/movie/day"),
  popular: withApiKey("/movie/popular"),
  topRated: withApiKey("/movie/top_rated"),
  nowPlaying: withApiKey("/movie/now_playing"),
  upcoming: withApiKey("/movie/upcoming"),
};

export const getMovieDetailEndpoint = (id) => withApiKey(`/movie/${id}`);

