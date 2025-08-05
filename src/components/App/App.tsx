'use client';

import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchSubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setMovies([]); 

    try {
      const results = await fetchMovies({ query });

      if (results.length === 0) {
        toast('Фільми не знайдено за вашим запитом.');
      }

      setMovies(results);
    } catch {
      setError('Не вдалося отримати фільми.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <h1>🎬 Movie Explorer</h1>

      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}