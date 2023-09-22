import { Link } from 'wouter'
import styles from './Movie.module.css';
import StarRating from '../StarRating/StarRating';
interface MovieProps {
    title: string;
    id: number;
    poster_path: string;
    description?: string;
    popularity?: number
    //duration?: string;
    year?: string;
    director?: string;
    rating?: number;
    imdbLink?: string;
}
export default function Movie({ title, id, poster_path, description, popularity, year, director, rating, imdbLink }: MovieProps) {
    return (
        <div>
            <Link href={`/movie/${id}`}>
                <div className={styles.filmCard} style={{ backgroundImage: `url(${poster_path})` }}>
                    <h2 className={styles.filmCardTitle}>{title}</h2>
                    <span className={styles.filmCardDescription}>{description}</span>
                    <div className={styles.filmCardInfos}>
                        <div>
                            <span className={styles.infoHead}>Popularity</span>
                            {popularity}
                        </div>
                        
                        <div>
                            <span className={styles.infoHead}>Year</span>
                            {year}
                        </div>
                        {/* Añade más información aquí si es necesario */}
                    </div>
                    <div className={styles.filmCardImdb}>
                        <StarRating rating={rating || 0} />
                        <a href={imdbLink} className={styles.filmCardImdbButton} target="_blank" rel="noreferrer">IMDb</a>
                    </div>
                </div>
            </Link>
        </div>
    )
}
