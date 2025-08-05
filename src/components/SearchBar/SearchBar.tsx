'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { searchAction } from '../actions/search';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onQueryChange: (query: string) => void;
}

export const SearchBar = ({ onQueryChange }: SearchBarProps) => {
  const [query, formAction] = useFormState(searchAction, '');

  useEffect(() => {
    if (query) {
      onQueryChange(query);
    }
  }, [query, onQueryChange]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={formAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};