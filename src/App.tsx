import { useEffect, useState } from 'react';
import axios from 'axios'; 
import type { Movie } from './types/movie';
import { MovieModal } from './components/MovieModal/MovieModal';
import css from './App.module.css';

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!TOKEN) {
      console.error('TMDB token is missing. Please set VITE_TMDB_TOKEN in .env');
      return;
    }

    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { query },
          headers: {
            Authorization: `Bearer ${TOKEN}`, 
            accept: 'application/json',
          },
        });

        setMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
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