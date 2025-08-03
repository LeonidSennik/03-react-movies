import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import { MovieModal } from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      try {
        const response = await fetchMovies({ query });
        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    loadMovies();
  }, [query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    setQuery(input.value.trim());
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <h1>🎬 Movie Explorer</h1>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input name="search" type="text" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>

      <ul className={css.gallery}>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => handleSelectMovie(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className={css.thumbnail}
            />
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}