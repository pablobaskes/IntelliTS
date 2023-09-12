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
import { ListItem } from '../types/List.interfaces';

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



export { useMoviesByQuery, useTrendMovies, useMovieDetails, useFavoriteMovies };
