import { useEffect } from 'react';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { SkeletonCard } from './SkeletonCard';
import { ErrorBanner } from './ErrorBanner';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: Props) {
  const { data, isLoading, isError, error, refetch } = useMovieDetails(movieId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!movieId) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Zamknij">✕</button>

        {isLoading && (
          <div className="modal-skeleton">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {isError && (
          <ErrorBanner
            message={(error as Error)?.message ?? 'Błąd ładowania szczegółów'}
            onRetry={() => refetch()}
          />
        )}

        {data && (
          <>
            {data.backdrop_path && (
              <div className="modal-backdrop">
                <img src={`${BACKDROP_BASE}${data.backdrop_path}`} alt="" aria-hidden="true" />
                <div className="modal-backdrop-gradient" />
              </div>
            )}
            <div className="modal-body">
              <div className="modal-poster">
                <img
                  src={data.poster_path ? `${IMG_BASE}${data.poster_path}` : '/no-poster.png'}
                  alt={`Plakat: ${data.title}`}
                />
              </div>
              <div className="modal-details">
                <h2>{data.title}</h2>
                {data.tagline && <p className="tagline">„{data.tagline}"</p>}
                <div className="modal-meta">
                  <span>📅 {data.release_date?.slice(0, 4)}</span>
                  <span>⭐ {data.vote_average.toFixed(1)} ({data.vote_count} głosów)</span>
                  {data.runtime && <span>⏱ {data.runtime} min</span>}
                </div>
                {data.genres?.length > 0 && (
                  <div className="genres">
                    {data.genres.map((g) => (
                      <span key={g.id} className="genre-tag">{g.name}</span>
                    ))}
                  </div>
                )}
                <p className="overview">{data.overview || 'Brak opisu.'}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
