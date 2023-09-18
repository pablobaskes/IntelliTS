import axios from "axios";
import {
  Movie,
  MoviesResponse,
} from "../types/tmdb/responses/Movies.interfaces";
import { handleAxiosError } from "./handleAxiosError";
import { BASE_URL, IMAGE_BASE_URLw185, TMDB_TOKEN } from "./settings";
import { MovieDetails } from "../types/tmdb/responses/MovieDetails.interfaces";

async function getMoviesFromUrl(
  endpoint: string,
  params?: unknown,
  imageSize: string = IMAGE_BASE_URLw185
): Promise<{ movies: Movie[]; total_pages: number }> {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      params,
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });
    const data: MoviesResponse = res.data;
    const movies = data.results.map((movie) => {
      const poster_path = movie.poster_path
        ? `${imageSize}${movie.poster_path}`
        : "https://via.placeholder.com/185x278.png?text=No+Image";
      return {
        ...movie,
        poster_path,
      };
    });
    return { movies, total_pages: data.total_pages };
  } catch (error: unknown) {
    handleAxiosError(error);
    return { movies: [], total_pages: 0 };
  }
}

async function getMovieDetailsByURL(
  endpoint: string,
  params?: unknown,
  
): Promise<MovieDetails | undefined> {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      params,
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });
    const movieDetails: MovieDetails = res.data;

    const poster_path = movieDetails.poster_path
      ? `${IMAGE_BASE_URLw185}${movieDetails.poster_path}`
      : "https://via.placeholder.com/185x278.png?text=No+Image";
    return {
      ...movieDetails,
      poster_path,
    };
  } catch (error: unknown) {
    handleAxiosError(error);
    return;
  }
}
export { getMoviesFromUrl, getMovieDetailsByURL };
