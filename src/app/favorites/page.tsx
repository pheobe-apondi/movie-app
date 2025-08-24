"use client";

import React, { useEffect, useState } from "react";
import MovieScroller from "../home/components/mostViewed";
import { Movie } from "@/app/types/movies";
import NavBar from "../Shared-components/navbar";

const FavouritesPage: React.FC = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      setFavouriteMovies(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
        <NavBar/>
      <h1 className="text-3xl p-4 font-black">My Favourites</h1>
      {favouriteMovies.length === 0 ? (
        <p className="p-4">You haven't liked any movies yet.</p>
      ) : (
        <MovieScroller  />
      )}
    </div>
  );
};

export default FavouritesPage;
