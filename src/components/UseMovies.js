import { useState, useEffect } from 'react';

const APIKEY = '19c95cb7';
export function useMovies(query) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setError('');
        if (!query) return; // Exit early if the query is empty
        try {
          setIsLoading(true);
          setError(''); // Clear previous errors

          const res = await fetch(
            `https://www.omdbapi.com/?apiKey=${APIKEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error('Something went wrong');

          const data = await res.json();

          if (data.Response === 'False') {
            setError('Movie not found');
            return;
          }

          setMovies(data.Search);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message || 'An unknown error occurred.');
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setError('');
        setMovies([]);
      }
      //   handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
