'use client';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

export default function App() {
  const [query,setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await fetchMovies({ query });
        setMovies(movies);
      } catch {
        setError('Failed to fetch movies.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  return (
  <div className={css.container}>
    <Toaster position="top-right" />
    <h1>🎬 Movie Explorer</h1>

    {isLoading && <Loader />}
    {error && <ErrorMessage message={error} />}
    {!isLoading && !error && movies.length === 0 && (
      <p className={css.empty}>No movies found for your query.</p>
    )}

    <SearchBar onQueryChange={setQuery} />
    <MovieGrid movies={movies} onSelect={setSelectedMovie} />

    {selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    )}
  </div>
);
}