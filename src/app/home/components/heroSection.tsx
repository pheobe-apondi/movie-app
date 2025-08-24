import React from "react";
import Image from "next/image";
import { Movie } from "@/app/types/movies";

interface HeroSectionProps {
    movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
    return (
        <section className="relative w-full h-[80vh] flex items-center justify-start text-white">
            <div className="absolute inset-0 -z-10">
                {movie.backdrop_path && (
                    <Image
                        src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        priority
                        className="object-cover brightness-50"
                    />

                )}
            </div>

            <div className="max-w-2xl px-6">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                <p className="text-lg mb-4 line-clamp-3 mt-10">{movie.overview}</p>
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-semibold">
                     {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-sm opacity-80">
                        {new Date(movie.release_date).getFullYear()}
                    </span>
                </div>
                <button className="bg-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition mt-15">
                    Watch Now
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
