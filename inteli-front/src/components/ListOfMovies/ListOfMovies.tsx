import { useEffect, useState } from "react";
import { Time_window } from "../../types/tmdb/parameters/TmdbSearchParameters .interfaces";
import { getTrendMovies } from "../../services/movies.services";
import { Movie } from "../../types/tmdb/responses/Movies.interfaces";

interface ListOfMoviesProps {
    time_window: Time_window;
}

const ListOfMovies: React.FC<ListOfMoviesProps> = ({ time_window }) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getTrendMovies(time_window).then(setMovies).catch(console.error);
    }, [time_window]);

    return (
        <div>
            <h2>List of Movies</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={movie.poster_path} alt={movie.title} />
                        <p>{movie.overview}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListOfMovies;
