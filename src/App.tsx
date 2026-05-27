import { useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MovieModal } from './components/MovieModal';
import { ClassicPage } from './pages/ClassicPage';
import { InfinitePage } from './pages/InfinitePage';
import { FavoritesPage } from './pages/FavoritesPage';
import type { Movie } from './hooks/useFetchMovies';

const pageVariants = {
  initial: { opacity: 0, x: -16 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    x: 16,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

export default function App() {
  const location = useLocation();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

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
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          📄 Klasyczna paginacja
        </NavLink>
        <NavLink to="/infinite" className={({ isActive }) => (isActive ? 'active' : '')}>
          ♾️ Infinite scroll
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
          ❤️ Ulubione
        </NavLink>
      </nav>

      <main className="app-main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ClassicPage onMovieClick={handleMovieClick} />
                </motion.div>
              }
            />
            <Route
              path="/infinite"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <InfinitePage onMovieClick={handleMovieClick} />
                </motion.div>
              }
            />
            <Route
              path="/favorites"
              element={
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FavoritesPage onMovieClick={handleMovieClick} />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <MovieModal
        movieId={selectedMovieId}
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
}
