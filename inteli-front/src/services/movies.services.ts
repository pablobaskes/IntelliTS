import {
  Movie,
  OriginalLanguage,
} from "../types/tmdb/responses/Movies.interfaces";
import { Time_window } from "../types/tmdb/parameters/TmdbSearchParameters .interfaces";
import { getMoviesFromUrl } from "../utils/handleMovies";
import { IMAGE_BASE_URLw342 } from "../utils/settings";
const language = OriginalLanguage.En;

async function getRecommendedMovies(
  movie_id: number
): Promise<{ movies: Movie[]; total_pages: number }> {
  const recommendedMoviesParams = {
    language,
  };

  return getMoviesFromUrl(
    `/movie/${movie_id}/recommendations`,
    recommendedMoviesParams
  );
}

async function getSimilarMovies(
  movie_id: number
): Promise<{ movies: Movie[]; total_pages: number }> {
  const similarMoviesParams = {
    language,
  };

  return getMoviesFromUrl(`/movie/${movie_id}/similar`, similarMoviesParams);
}

async function getTrendMovies(
  time_window: Time_window
): Promise<{ movies: Movie[]; total_pages: number }> {
  const trendParams = {
    language,
  };
  return getMoviesFromUrl(
    `/trending/movie/${time_window}`,
    trendParams,
    IMAGE_BASE_URLw342
  );
}

async function getMoviesByQuery(
  query: string,
  page = 1
): Promise<{ movies: Movie[]; total_pages: number }> {
  const searchParams = {
    query,
    language,
    page,
  };

  return getMoviesFromUrl("/search/multi", searchParams);
}

export {
  getTrendMovies,
  getMoviesByQuery,
  getSimilarMovies,
  getRecommendedMovies,
};
