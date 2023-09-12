import { MovieDetails } from "../../types/tmdb/responses/MovieDetails.interfaces";
import Movie from "../Movie/Movie.component";
import styles from './FavoriteMovies.module.css'

const FavoriteMovies = ({ favoriteMovies }: { favoriteMovies: MovieDetails[] }) => {
    return (
        <div>
            <h2>Your Favorite Movies:</h2>
            <div className={styles.mainFavMovies}>
                {favoriteMovies.map(movie => (
                    <div key={movie.id}>
                        <Movie 
                            title={movie.title}
                            id={movie.id}
                            poster_path={movie.poster_path}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteMovies;
