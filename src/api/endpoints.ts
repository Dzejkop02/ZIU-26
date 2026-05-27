export const ENDPOINTS = {
  popularMovies: '/movie/popular',
  searchMovies: '/search/movie',
  movieDetail: (id: number) => `/movie/${id}`,
  genres: '/genre/movie/list',
} as const;
