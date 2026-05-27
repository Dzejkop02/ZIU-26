import { useState, useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';
import './MovieCard.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      setOptimisticFav(!displayedFav);
      try {
        await toggleFavorite(movie);
        setOptimisticFav(null);
      } catch {
        setOptimisticFav(null);
      }
    },
    [displayedFav, toggleFavorite, movie]
  );

  return (
    <div className="movie-card card" onClick={() => onClick?.(movie)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(movie)}>
      <div className="movie-poster">
        <img
          src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/no-poster.png'}
          alt={`Plakat: ${movie.title}`}
          loading="lazy"
        />
        <div className="movie-overlay">
          <span className="movie-score">⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>
        <button
          onClick={handleToggle}
          aria-label={displayedFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          className={`fav-btn ${displayedFav ? 'active' : ''}`}
        >
          {displayedFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
