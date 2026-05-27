import { FavoritesList } from '../components/FavoritesList';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  onMovieClick: (movie: Movie) => void;
}

export function FavoritesPage({ onMovieClick }: Props) {
  return <FavoritesList onMovieClick={onMovieClick} />;
}
