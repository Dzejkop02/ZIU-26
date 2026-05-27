import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { useToastContext } from '../context/ToastContext';
import type { Movie } from '../hooks/useFetchMovies';
import './MovieCard.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToastContext();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  // Accessibility: przy prefers-reduced-motion animacja używa tylko fade (bez osi Y)
  const shouldReduce = useReducedMotion();
  const cardVariants = {
    hidden: shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      const willBeFav = !displayedFav;
      setOptimisticFav(willBeFav);
      try {
        await toggleFavorite(movie);
        addToast(
          willBeFav ? `❤️ Dodano do ulubionych: ${movie.title}` : `🗑️ Usunięto z ulubionych: ${movie.title}`,
          willBeFav ? 'success' : 'info'
        );
        setOptimisticFav(null);
      } catch {
        setOptimisticFav(null);
        addToast('❌ Błąd podczas zmiany ulubionych', 'error');
      }
    },
    [displayedFav, toggleFavorite, movie, addToast]
  );

  return (
    <motion.div
      className="movie-card card"
      onClick={() => onClick?.(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(movie)}
      variants={cardVariants}
    >
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
    </motion.div>
  );
}
