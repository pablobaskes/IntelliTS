import { useEffect, useState, useCallback } from 'react';
import Reviews from "../../components/Reviews/Reviews";
import { useMovieDetails } from "../../hooks/Movies.hooks";
import { getReviews, postReview } from '../../services/reviews.service';
import { getListsByUserId, postListItem } from '../../services/user.services';

import styles from './Details.module.css';
import { Review } from '../../types/Review.interfaces';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../types/DecodedToken.interfaces';
import MovieHero from '../../components/movieHero/movieHero';

const Details = () => {
    const movie = useMovieDetails();
    const [inputValue, setInputValue] = useState('');
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [favoriteListId, setFavoriteListId] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    

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

    

    return (
        <div className={styles.detailsContainer}>
            {movie && <MovieHero movie={movie} />}
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
