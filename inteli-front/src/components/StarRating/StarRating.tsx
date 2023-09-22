import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

interface RatingProps {
    rating: number
}

const StarRating: React.FC<RatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <FontAwesomeIcon key={`full-${i}`} icon={faStar} color='yellow'/>
            ))}
            {[...Array(halfStars)].map((_, i) => (
                <FontAwesomeIcon key={`half-${i}`} icon={faStarHalf} color='yellow'/>
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <FontAwesomeIcon key={`empty-${i}`} icon={faStar} color="black" />
            ))}
        </>
    );
};

export default StarRating;
