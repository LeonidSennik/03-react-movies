import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<AxiosResponse<TMDBResponse>> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error('TMDB token is missing. Please set VITE_TMDB_TOKEN in .env');
  }

  return axios.get<TMDBResponse>('https://api.themoviedb.org/3/search/movie', {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    },
  });
}