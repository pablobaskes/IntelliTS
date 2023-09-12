import React from "react";
import { Movie } from "../../types/tmdb/responses/Movies.interfaces";
import { useTrendMovies } from "../../hooks/Movies.hooks";
import { Link } from "wouter";
import styles from './Slider.module.css'

const Slider: React.FC = () => {
    const {movies} = useTrendMovies("week");

    return (
        <section className={styles.trends}>
            {movies.slice(0, 7).map((movie: Movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                    <img src={movie.poster_path} alt={movie.title}></img>
                </Link>
            ))}
        </section>
    );
};

export default Slider;
