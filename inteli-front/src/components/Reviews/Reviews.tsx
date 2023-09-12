import { Review } from '../../types/Review.interfaces';
import SingleReview from '../SingleReview/SingleReview';
import styles from './Reviews.module.css';

interface ListOfReviewsProps {
    movieId: string;
    reviews: Review[] | null;
}

const ListOfReviews: React.FC<ListOfReviewsProps> = ({ reviews }) => {

    return (
        <div className={styles.reviewsContainer}>
            {reviews ? (
                reviews.map((review) => <SingleReview key={review._id} review={review} />)
            ) : (
                <p className={styles.loadingText}>Loading reviews...</p>
            )}
        </div>
    );
};

export default ListOfReviews;
