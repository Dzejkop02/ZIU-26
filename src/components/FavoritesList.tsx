import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  onMovieClick: (movie: Movie) => void;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w92';

export function FavoritesList({ onMovieClick }: Props) {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <aside className="favorites-list">
      <h2>❤️ Ulubione ({favorites.length})</h2>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id} className="fav-item">
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
          </li>
        ))}
      </ul>
    </aside>
  );
}
