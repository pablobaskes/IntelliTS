import { useEffect, useState, useCallback } from 'react';
import Reviews from "../../components/Reviews/Reviews";
import { useMovieDetails } from "../../hooks/Movies.hooks";
import { getReviews, postReview } from '../../services/reviews.service';
import { getListsByUserId, postListItem } from '../../services/user.services';

import styles from './Details.module.css';
import { Review } from '../../types/Review.interfaces';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../types/DecodedToken.interfaces';
import { List } from '../../types/List.interfaces';

const Details = () => {
    const movie = useMovieDetails();
    const [inputValue, setInputValue] = useState('');
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [favoriteListId, setFavoriteListId] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [showAddToListDropdown, setShowAddToListDropdown] = useState(false);
    const [selectedListId, setSelectedListId] = useState<string | undefined>(undefined);
    const [userLists, setUserLists] = useState<List[]>([]);

    const fetchReviews = useCallback(async () => {
        if (movie) {
            const fetchedReviews = await getReviews(movie.id.toString());
            setReviews(fetchedReviews);
        }
    }, [movie]);

    useEffect(() => {
        fetchReviews();

        const fetchFavoriteList = async () => {
            const token = localStorage.getItem("jwt");
            if (token) {
                const decodedToken: DecodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                const lists = await getListsByUserId(userId);
                const favoriteList = lists.find(list => list.type === "system");
                if (favoriteList) {
                    setFavoriteListId(favoriteList._id);
                }
            }
        };
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
        fetchFavoriteList();

    }, [fetchReviews]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (movie) {
            await postReview(movie.id.toString(), inputValue);
            setInputValue('');
            fetchReviews();
        }
    };

    const handleLike = async () => {
        if (movie && favoriteListId) {
            await postListItem({ listId: favoriteListId, movieId: movie.id.toString() });
            setIsLiked(true);
        }
    };

    const handleAddToList = async () => {
        if (movie && selectedListId) {
            await postListItem({ listId: selectedListId, movieId: movie.id.toString() });
            setShowAddToListDropdown(false);
        }
    };

    return (
        <div className={styles.detailsContainer}>
            <h2>{movie?.title}</h2>
            <img src={movie?.poster_path} alt={movie?.title} />

            <button className='btn btn-secondary' onClick={() => setShowAddToListDropdown(!showAddToListDropdown)}>
                Add to list
            </button>
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
            <form className={styles.searchWrapper} onSubmit={handleSubmit}>
                <input
                    className={styles.inputField}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Write a review..."
                />
                <button className={styles.postReviewButton} type="submit">Post Review</button>
            </form>
            {favoriteListId && !isLiked && (
                <button className='btn btn-primary' onClick={handleLike}>Like</button>
            )}
            {movie && <Reviews movieId={movie.id.toString()} reviews={reviews} />}
        </div>
    )
}

export default Details;
