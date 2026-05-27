import { useState, useEffect } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import { useDebounce } from '../hooks/useDebounce';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/Skeleton';
import { ErrorBanner } from '../components/ErrorBanner';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  onMovieClick: (movie: Movie) => void;
}

export function ClassicPage({ onMovieClick }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // Symulacja minimalnego czasu skeleton przy pierwszym załadowaniu
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitializing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useFetchMovies(
    page,
    debouncedQuery
  );

  const handleQueryChange = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  return (
    <>
      <SearchBar value={query} onChange={handleQueryChange} />

      <div className={`movie-grid ${isPlaceholderData ? 'faded' : ''}`}>
        {(isLoading || initializing) &&
          Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={i} />)}

        {isError && !initializing && (
          <div className="full-width">
            <ErrorBanner
              message={(error as Error)?.message ?? 'Błąd ładowania danych'}
              onRetry={() => refetch()}
            />
          </div>
        )}

        {!isLoading && !initializing && !isError && data?.results.length === 0 && (
          <div className="full-width">
            <EmptyState />
          </div>
        )}

        {!isLoading &&
          !initializing &&
          !isError &&
          data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
      </div>

      {data && data.total_pages > 1 && (
        <Pagination
          page={page}
          totalPages={data.total_pages}
          onPageChange={setPage}
          isPlaceholderData={isPlaceholderData}
        />
      )}
    </>
  );
}
