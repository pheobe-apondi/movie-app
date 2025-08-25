"use client";

import React, { useMemo } from "react";
import HeroSection from "./components/heroSection";
import MovieScroller from "./components/mostViewed";
import NavBar from "../Shared-components/navbar";
import UpcomingMovies from "./components/upcomingMovies";
import { useFetchLatestMovies } from "../hooks/userFetchLatestMovies";
import { Footer } from "../Shared-components/footer";


const Homepage: React.FC = () => {
  const { data: movies, loading, error } = useFetchLatestMovies();

  const heroMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }, [movies]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movies || movies.length === 0) return <p>No movies found.</p>;

  return (
    <main>
      <NavBar />
      {heroMovie && <HeroSection movie={heroMovie} />}
      <UpcomingMovies />
      <MovieScroller />
      <Footer/>
    </main>
  );
};

export default Homepage;
