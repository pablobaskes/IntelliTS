import { Review } from '../../types/Review.interfaces';
import { FaStar } from 'react-icons/fa';
import styles from './SingleReview.module.css';

interface ReviewProps {
    review: Review;
}

const SingleReview: React.FC<ReviewProps> = ({ review }) => {
    const stars = Array(review.rating).fill(0).map((_, i) => <FaStar key={i} />);

    return (
        <div className={styles.reviewBox}>
            <p className={styles.reviewContent}>{review.reviewBody}</p>
            <div className={styles.reviewRating}>{stars}</div>
            <p className={styles.reviewSpoiler}>{review.isSpoiler ? 'Contains spoilers' : 'No spoilers'}</p>
        </div>
    );
};

export default SingleReview;
