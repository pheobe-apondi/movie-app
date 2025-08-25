import tmdbFetch from "./fetchMovies";
import { MoviesResponse } from "../types/movies";

export  async function FetchLatestMovies(): Promise<MoviesResponse> {
  const res = await tmdbFetch("movie/now_playing"); 
 
  return res;
}
