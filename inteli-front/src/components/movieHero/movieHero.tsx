import { useEffect, useState } from 'react';
import { List } from '../../types/List.interfaces';
import { MovieDetails } from '../../types/tmdb/responses/MovieDetails.interfaces';
import styles from './movieHero.module.css';
import { getListsByUserId, postListItem } from '../../services/user.services';
import { DecodedToken } from '../../types/DecodedToken.interfaces';
import jwtDecode from 'jwt-decode';
import { IMAGE_BASE_URLw92 } from '../../utils/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../StarRating/StarRating';
interface MovieHeroProps {
    movie: MovieDetails;
}
const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
    const genres = movie.genres.map(genre => genre.name)
    const [showAddToListDropdown, setShowAddToListDropdown] = useState(false);
    const [selectedListId, setSelectedListId] = useState<string | undefined>(undefined);
    const [userLists, setUserLists] = useState<List[]>([]);
    const handleAddToList = async () => {
        if (movie && selectedListId) {
            await postListItem({ listId: selectedListId, movieId: movie.id.toString() });
            setShowAddToListDropdown(false);
        }
    };
    useEffect(() => {

        const fetchUserLists = async () => {
            const token = localStorage.getItem("jwt");
            if (token) {
                const decodedToken: DecodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const lists = await getListsByUserId(userId);
                setUserLists(lists);
            }
        };

        fetchUserLists();

    }, [])

    return (
        <div className={styles.movieHeroMovieCard}>
            <div className={styles.movieHeroContainer}>
                <img src={movie.poster_path} alt="cover" className={styles.movieHeroCover} />
                <div className={styles.movieHeroHero}>
                    <div className={styles.movieHeroDetails} style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
                        <div className={styles.movieHeroTitle1}>{movie.title}</div>
                        {/* <span>PG-13</span> */}
                        <div className={styles.movieHeroTitle2}>{movie.tagline}</div>
                        {/* <span className={styles.movieHeroLikes}>{Math.floor(movie.popularity)}</span> */}
                    </div>
                </div>
                <div className={styles.movieHeroDescription}>
                    <div className={styles.movieHeroColumn1}>
                        {
                            genres.map(genrename => (
                                <span className={styles.movieHeroTag} key={genrename}>{genrename}</span>
                            ))
                        }
                        <a href='#' onClick={() => setShowAddToListDropdown(!showAddToListDropdown)}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </a>
                        {showAddToListDropdown && userLists.length > 0 && (
                            <div>
                                <select className='form-select form-select-sm' value={selectedListId} onChange={(e) => setSelectedListId(e.target.value)}>
                                    {userLists.map(list => (
                                        <option key={list._id} value={list._id}>{list.name}</option>
                                    ))}
                                </select>
                                <button className='btn btn-primary' onClick={handleAddToList}>Add</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.movieHeroColumn2}>
                        <p>{movie.overview}</p>
                        <span> {movie.release_date.toString()} </span>
                        <span>Duration: {movie.runtime} minutes </span>
                        <span> Rating: <StarRating rating={Math.round(movie.vote_average)} /></span>

                        <div className={styles.movieHeroAvatars}>
                            {movie.production_companies.map(pm => (

                                <img key={pm.id} src={`${IMAGE_BASE_URLw92}${pm.logo_path}`}></img>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieHero;
