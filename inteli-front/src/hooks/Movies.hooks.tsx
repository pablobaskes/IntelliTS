import { useState, useEffect } from 'react';
import { Movie } from '../types/tmdb/responses/Movies.interfaces';
import { getMoviesByQuery, getTrendMovies } from '../services/movies.services';
import { Time_window } from '../types/tmdb/parameters/TmdbSearchParameters .interfaces';
import { useRoute } from 'wouter';
import { MovieDetails } from '../types/tmdb/responses/MovieDetails.interfaces';
import { getMovieDetailsByURL } from '../utils/handleMovies';
import { getListsByUserId, getListItemsOfAList } from '../services/user.services';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../types/DecodedToken.interfaces';
import axios from 'axios';
import { IMAGE_BASE_URLw342 } from '../utils/settings';

interface SearchParams {
    keyword?: string;
    type?: string;
}

const useMoviesByQuery = (params?: SearchParams, page = 1) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        if (params?.keyword) {
            const decodedKeyword = decodeURIComponent(params.keyword);
            getMoviesByQuery(decodedKeyword, page).then(result => {
                setMovies(result.movies);
                setTotalPages(result.total_pages);
            });

        }
    }, [params, page]);

    return { movies, totalPages };
};


const useTrendMovies = (time_window: Time_window) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        getTrendMovies(time_window).then(result => {
            setMovies(result.movies);
        });
    }, [time_window]);
    return { movies, 1: Number };
};
const useMovieDetails = () => {
    const [match, params] = useRoute('/movie/:id');
    const movieId = match ? params.id : null;
    const [movie, setMovie] = useState<MovieDetails | undefined>();

    useEffect(() => {
        if (movieId) {
            getMovieDetailsByURL(`/movie/${movieId}`).then(movie => {
                setMovie(movie);
            });
        }
    }, [movieId]);

    return movie;
};


const useFavoriteMovies = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const token = localStorage.getItem("jwt");
            if (token) {
                const decodedToken: DecodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const lists = await getListsByUserId(userId);
                const favoriteList = lists.find(list => list.type === "system");
                if (favoriteList) {
                    const movies = await getListItemsOfAList(favoriteList._id);
                    const movieDetailsPromises = movies.map(movie => getMovieDetailsByURL(`/movie/${movie.movieId}`));
                    const movieDetails = await Promise.all(movieDetailsPromises);
                    const validMovieDetails = movieDetails.filter(movie => movie !== undefined) as MovieDetails[];
                    setFavoriteMovies(validMovieDetails);
                }
            }
        };

        fetchFavoriteMovies();
    }, []);

    return favoriteMovies;
};



const useRecommendedMovies = () => {
    const [recommendedMovies, setRecommendedMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                if (token) {
                    const decodedToken: DecodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    const imageSize = IMAGE_BASE_URLw342
                    const favoriteMoviesResponse = await axios.get(`http://localhost:3000/list/user/favs/${userId}`);
                    const favoriteMovieIds = favoriteMoviesResponse.data;

                    const recommendationsResponse = await axios.post('http://localhost:8000/get_recommendations', {
                        favorite_movie_ids: favoriteMovieIds,
                    });
                    const recommended = recommendationsResponse.data.map((movie: { poster_path: string; }) => {
                        const poster_path = movie.poster_path
                            ? `${imageSize}${movie.poster_path}`
                            : "https://via.placeholder.com/185x278.png?text=No+Image";
                        return {
                            ...movie,
                            poster_path,
                        };
                    });
                    setRecommendedMovies(recommended);
                } else {
                    throw new Error('Token no encontrado o inválido');
                }
            } catch (err: any) {
                setError(err.message || 'Ha ocurrido un error al buscar las recomendaciones');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedMovies();
    }, []);

    return { recommendedMovies, loading, error };
};

export { useMoviesByQuery, useTrendMovies, useMovieDetails, useFavoriteMovies, useRecommendedMovies };
