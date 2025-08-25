import tmdbFetch from "./fetchMovies";
import { MoviesResponse } from "../types/movies";

export  async function FethUpcomingMovies(): Promise<MoviesResponse> {
  const res = await tmdbFetch("movie/upcoming"); 
 
  return res;
}
