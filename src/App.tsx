import { useState } from 'react';
import { useFetchMovies } from './hooks/useFetchMovies';
import { useDebounce } from './hooks/useDebounce';
import { MovieCard } from './components/MovieCard';
import { MovieModal } from './components/MovieModal';
import { SkeletonCard } from './components/SkeletonCard';
import { ErrorBanner } from './components/ErrorBanner';
import { EmptyState } from './components/EmptyState';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import { FavoritesList } from './components/FavoritesList';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import type { Movie } from './hooks/useFetchMovies';

type View = 'classic' | 'infinite' | 'favorites';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [view, setView] = useState<View>('classic');

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, isError, error, refetch, isPlaceholderData } = useFetchMovies(
    page,
    debouncedQuery
  );

  const handleQueryChange = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.id);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Browser</h1>
        <p className="subtitle">Przeglądaj filmy z TMDB</p>
      </header>

      <nav className="view-tabs">
        <button className={view === 'classic' ? 'active' : ''} onClick={() => setView('classic')}>
          📄 Klasyczna paginacja
        </button>
        <button className={view === 'infinite' ? 'active' : ''} onClick={() => setView('infinite')}>
          ♾️ Infinite scroll
        </button>
        <button className={view === 'favorites' ? 'active' : ''} onClick={() => setView('favorites')}>
          ❤️ Ulubione
        </button>
      </nav>

      <main className="app-main">
        {view !== 'favorites' && (
          <SearchBar value={query} onChange={handleQueryChange} />
        )}

        {view === 'classic' && (
          <>
            <div className={`movie-grid ${isPlaceholderData ? 'faded' : ''}`}>
              {isLoading &&
                Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}

              {isError && (
                <div className="full-width">
                  <ErrorBanner
                    message={(error as Error)?.message ?? 'Błąd ładowania danych'}
                    onRetry={() => refetch()}
                  />
                </div>
              )}

              {!isLoading && !isError && data?.results.length === 0 && (
                <div className="full-width">
                  <EmptyState />
                </div>
              )}

              {!isLoading &&
                !isError &&
                data?.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
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
        )}

        {view === 'infinite' && (
          <InfiniteMovieList query={debouncedQuery} onMovieClick={handleMovieClick} />
        )}

        {view === 'favorites' && (
          <FavoritesList onMovieClick={handleMovieClick} />
        )}
      </main>

      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
