'use client';

import { useId } from 'react';
import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const id = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawQuery = formData.get('query');
    const trimmedQuery = typeof rawQuery === 'string' ? rawQuery.trim() : '';

    if (!trimmedQuery) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(trimmedQuery);
  };

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor={`${id}-query`} className={styles.label}>
            Пошук
          </label>
          <input
            className={styles.input}
            type="text"
            name="query"
            id={`${id}-query`}
            autoComplete="off"
            placeholder="Введіть назву фільму..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Шукати
          </button>
        </form>
      </div>
    </header>
  );
};