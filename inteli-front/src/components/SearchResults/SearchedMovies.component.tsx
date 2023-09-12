import { useMemo, useState } from "react";
import { useRoute } from "wouter";
import { useMoviesByQuery } from "../../hooks/Movies.hooks";
import Movie from "../Movie/Movie.component";
import styles from './SearchResults.module.css';
import { usePagination } from "../../hooks/pagination.hooks";


const SearchResults = () => {
    const [, params] = useRoute('/search/:keyword');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const memoizedParams = useMemo(() => params, [params]);

    const { movies, totalPages } = useMoviesByQuery(memoizedParams || {}, currentPage);

    const pagination = usePagination({
        initialPage: currentPage,
        numberOfPages: totalPages,
        maxButtons: 5, // Adjust as needed
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.resultsContainer}>
            {movies.map(movie => (
                <div key={movie.id} className={styles.movieCard}>
                    <Movie
                        title={movie.title}
                        id={movie.id}
                        poster_path={movie.poster_path}
                    ></Movie>
                </div>
            ))}
            <div className={styles.paginationContainer}>
                {pagination.visiblePieces.map((piece, index) => {
                    if (piece.type === 'ellipsis') {
                        return <span key={index}>...</span>;
                    }

                    if (piece.type === 'page-number') {
                        return (
                            <button 
                                key={index} 
                                className={`btn btn-primary mx-2 ${piece.pageNumber === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(piece.pageNumber)}
                            >
                                {piece.pageNumber}
                            </button>
                        );
                    }

                    return (
                        <button 
                            key={index} 
                            className="btn btn-primary mx-2"
                            onClick={() => handlePageChange(piece.pageNumber)}
                            disabled={piece.isDisabled}
                        >
                            {piece.type === 'next' ? '>' : '<'}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchResults;
