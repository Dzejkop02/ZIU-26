import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  query: string;
  onMovieClick: (movie: Movie) => void;
}

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

export function InfiniteMovieList({ query, onMovieClick }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteMovies(query);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const movies = data?.pages.flatMap((p) => (p as unknown as { results: Movie[] }).results) ?? [];

  return (
    <>
      <motion.ul
        className="movie-grid"
        style={{ listStyle: 'none', padding: 0 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // key zmusza re-stagger gdy query się zmienia
        key={query}
      >
        {isLoading && Array.from({ length: 12 }).map((_, i) => (
          <li key={i}><SkeletonCard /></li>
        ))}

        {movies.map((movie) => (
          <motion.li key={movie.id} variants={itemVariants}>
            <MovieCard movie={movie} onClick={onMovieClick} />
          </motion.li>
        ))}

        {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => (
          <li key={`sk-${i}`}><SkeletonCard /></li>
        ))}
      </motion.ul>

      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}
