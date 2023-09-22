import { useRecommendedMovies } from "../../hooks/Movies.hooks";
import Movie from "../Movie/Movie.component";
import styles from './recommendedMovies.module.css'
const RecommendationsComponent: React.FC = () => {
    const { recommendedMovies, loading, error } = useRecommendedMovies();
    
    if (loading) return <div>Cargando...</div>;
    if (error) return <div></div>;

    return (
        <div className={styles.recommendedMainContainer}>
            
            {recommendedMovies.map(movie => (
                <div key={movie.id} className={styles.movieCard}>
                    <Movie
                        title={movie.title}
                        id={movie.id}
                        poster_path={movie.poster_path}
                    ></Movie>
                </div>
            ))}
        </div>
    );
};

export default RecommendationsComponent;
