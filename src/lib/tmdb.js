const API_URL = "https://api.themoviedb.org/3";

export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

//para setearle la api key a cada endpoint, para no repetirlo
const withApiKey = (path) =>
  `${API_URL}${path}?api_key=${API_KEY}&language=es-ES`;

//endpoints!!
export const movieEndpoints = {
  trending: withApiKey("/trending/movie/day"),
  popular: withApiKey("/movie/popular"),
  topRated: withApiKey("/movie/top_rated"),
  nowPlaying: withApiKey("/movie/now_playing"),
  upcoming: withApiKey("/movie/upcoming"),
};

//.slug es la parte de la url que identifica a cada categoria
export const movieCategories = [
  {
    key: "trending",
    slug: "tendencia",
    title: "Trending",
    description: "Peliculas mas habladas en el dia.",
    endpoint: movieEndpoints.trending,
  },
  {
    key: "popular",
    slug: "populares",
    title: "Peliculas populares",
    description: "Los titulos mas populares segun TMDB.",
    endpoint: movieEndpoints.popular,
  },
  {
    key: "topRated",
    slug: "mejor-puntuadas",
    title: "Mejor puntuadas",
    description: "Peliculas ordenadas por la puntuacion de la comunidad.",
    endpoint: movieEndpoints.topRated,
  },
  {
    key: "nowPlaying",
    slug: "cartelera",
    title: "En cartelera",
    description: "Peliculas que se encuentran actualmente en cartelera.",
    endpoint: movieEndpoints.nowPlaying,
  },
  {
    key: "upcoming",
    slug: "proximos-estrenos",
    title: "Proximos estrenos",
    description: "Peliculas proximas a estrenarse.",
    endpoint: movieEndpoints.upcoming,
  },
];

//con el slug de la url, obtenemos la categoria correspondiente
export const getMovieCategoryBySlug = (slug) =>
  movieCategories.find((category) => category.slug === slug);

export const getMovieDetailEndpoint = (id) => withApiKey(`/movie/${id}`);

export const getMovieSearchEndpoint = (query) =>
  `${withApiKey("/search/movie")}&query=${encodeURIComponent(query)}`;
