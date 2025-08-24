"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Movie } from "@/app/types/movies";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useFetchLatestMovies } from "@/app/hooks/userFetchLatestMovies";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieScroller: React.FC = () => {
  const { data: movies, loading, error } = useFetchLatestMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [favourites, setFavourites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  const isFavourite = (movie: Movie) =>
    favourites.some((m) => m.id === movie.id);

  const toggleFavourite = (movie: Movie) => {
    setFavourites((prev) => {
      const alreadyLiked = prev.some((m) => m.id === movie.id);
      const updated = alreadyLiked
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];

      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) return <p className="text-center mt-10">Loading movies...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movies || movies.length === 0) return <p className="text-center mt-10">No movies found.</p>;

  return (
    <>
      <h1 className="text-3xl p-3 font-black">Latest Movies</h1>
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide hide-scrollbar">
        {movies.map((movie) =>
          movie.poster_path ? (
            <div
              key={movie.id}
              className="relative min-w-[150px] flex-shrink-0 cursor-pointer"
            >
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={250}
                className="rounded-lg shadow-lg"
                priority={false}
                onClick={() => setSelectedMovie(movie)}
              />
              <button
                className="absolute top-2 right-2 text-red-500 text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(movie);
                }}
                aria-label={isFavourite(movie) ? "Remove from favourites" : "Add to favourites"}
              >
                {isFavourite(movie) ? <HeartFill /> : <Heart />}
              </button>
            </div>
          ) : null
        )}
      </div>

      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-gray-900 text-white rounded-lg max-w-3xl w-full p-6 relative overflow-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-8 right-12 text-red-500 text-3xl"
              onClick={() => toggleFavourite(selectedMovie)}
              aria-label={isFavourite(selectedMovie) ? "Remove from favourites" : "Add to favourites"}
            >
              {isFavourite(selectedMovie) ? <HeartFill /> : <Heart />}
            </button>

            {selectedMovie.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                alt={selectedMovie.title}
                className="w-full h-auto rounded-md mb-4"
              />
            )}

            <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="mb-4">{selectedMovie.overview}</p>
            <p className="mb-2">Rating: {selectedMovie.vote_average.toFixed(1)}</p>
            <p className="mb-4">
              Release Year: {new Date(selectedMovie.release_date).getFullYear()}
            </p>

            <button
              className="absolute top-3 right-3 text-3xl font-bold hover:text-yellow-400"
              onClick={() => setSelectedMovie(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieScroller;
