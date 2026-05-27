import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from '../components/SearchBar';
import { InfiniteMovieList } from '../components/InfiniteMovieList';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  onMovieClick: (movie: Movie) => void;
}

export function InfinitePage({ onMovieClick }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <InfiniteMovieList query={debouncedQuery} onMovieClick={onMovieClick} />
    </>
  );
}
