import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  onMovieClick: (movie: Movie) => void;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w92';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FavoritesList({ onMovieClick }: Props) {
  const { favorites, toggleFavorite } = useFavorites();

  // Lokalny stan kolejności — drag zmienia items, add/remove synchronizuje z favorites
  const [items, setItems] = useState<Movie[]>(favorites);

  useEffect(() => {
    setItems((prev) => {
      // Zachowaj aktualną kolejność drag dla istniejących elementów
      const favIds = new Set(favorites.map((m) => m.id));
      const kept = prev.filter((m) => favIds.has(m.id));
      // Dołącz nowo dodane filmy na końcu
      const keptIds = new Set(kept.map((m) => m.id));
      const added = favorites.filter((m) => !keptIds.has(m.id));
      return [...kept, ...added];
    });
  }, [favorites]);

  if (favorites.length === 0) return (
    <p className="empty-state">
      <span className="empty-icon">🤍</span>
      Brak ulubionych filmów. Dodaj coś z listy!
    </p>
  );

  return (
    <aside className="favorites-list">
      <h2>❤️ Ulubione ({items.length})</h2>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((movie) => (
          <Reorder.Item
            key={movie.id}
            value={movie}
            variants={itemVariants}
            className="fav-item"
            style={{ cursor: 'grab' }}
            whileDrag={{ cursor: 'grabbing', scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
          >
            <button className="fav-item-btn" onClick={() => onMovieClick(movie)}>
              <img
                src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/no-poster.png'}
                alt={movie.title}
              />
              <span>{movie.title}</span>
            </button>
            <button
              className="fav-remove-btn"
              onClick={() => toggleFavorite(movie)}
              aria-label={`Usuń ${movie.title} z ulubionych`}
            >
              ✕
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </aside>
  );
}
