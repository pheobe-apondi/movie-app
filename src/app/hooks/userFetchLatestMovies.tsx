import { useEffect, useState } from "react";
import { FetchLatestMovies } from "../utils/fetchLatestMovies";
import { Movie } from "../types/movies";

export function useFetchLatestMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await FetchLatestMovies();
        console.log(data);
        setMovies(data.results || []); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return { data: movies, loading, error };
}
