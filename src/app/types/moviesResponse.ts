import { Movie } from "./movies";


export interface MoviesResponse{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;



}